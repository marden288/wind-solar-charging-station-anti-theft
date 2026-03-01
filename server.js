const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ─── Routes ───────────────────────────────────
app.use('/api/auth',    require('./routes/authRoutes'));
app.use('/api/sensor',  require('./routes/sensorRoutes'));
app.use('/api/theft',   require('./routes/theftRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: '⚡ EcoCharge API is running!', status: 'OK' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 EcoCharge Server running on http://localhost:${PORT}`);
});