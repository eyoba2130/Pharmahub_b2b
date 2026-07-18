const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ለሙከራ የሚሆን ስርዓተ-ነጥብ (health check)
app.get('/', (req, res) => {
    res.send('PharmHub B2B Backend እየሰራ ነው! 🚀');
});

// ኤፒአይ መንገዶችን እዚህ እናክላለን (በደረጃ 5)
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/inventory', require('./routes/inventoryRoutes'));
// app.use('/api/orders', require('./routes/orderRoutes'));

app.listen(PORT, () => {
    console.log(`ሰርቨሩ በ${PORT} ላይ እየሰራ ነው`);
});