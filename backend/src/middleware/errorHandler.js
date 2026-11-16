/**
 * Global error handling middleware.
 * Catches all errors passed via next(err) and sends a consistent JSON response.
 */
export const errorHandler = (err, req, res, next) => {
  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    // Collect all validation error messages
    const errors = Object.values(err.errors).map(e => e.message);
    message = `Validation failed: ${errors.join(', ')}`;
  }

  // Handle Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern)[0];
    message = `Duplicate value for field '${field}'. Please use a unique value.`;
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please log in again.';
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Your session has expired. Please log in again.';
  }

  // Handle Multer errors (file upload)
  if (err.name === 'MulterError') {
    statusCode = 400;
    message = err.message || 'File upload error';
  }

  // Log the full error for debugging (in development)
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Error:', err);
  } else {
    // In production, log only minimal info
    console.error(`[${new Date().toISOString()}] ${err.message}`);
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    message,
    // Include stack trace only in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    // Optionally include additional error details if needed
    ...(err.errors && { details: err.errors }),
  });
};

// Optional: custom error class for operational errors
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}