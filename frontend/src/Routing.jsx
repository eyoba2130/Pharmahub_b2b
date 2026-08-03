import React from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';


function Routing() {
  return (
    <AuthProvider>
       <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
     
  );
}

export default Routing;