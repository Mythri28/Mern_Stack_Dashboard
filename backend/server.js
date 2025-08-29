const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Existing route
app.get('/', (req, res) => {
  res.json({ message: 'MERN Dashboard API is working!' });
});

// ============ ADD THESE NEW ROUTES ============
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({ 
      success: true, 
      token: 'mock-jwt-token', 
      user: { 
        id: 1, 
        name: 'John Doe', 
        email: email,
        avatar: 'https://example.com/avatar.jpg'
      } 
    });
  } else {
    res.status(401).json({ success: false, message: 'Email and password required' });
  }
});

app.get('/api/dashboard', (req, res) => {
  const dashboardData = {
    revenue: 2129430,
    transactions: 1520,
    users: 9721,
    schedules: 3106,
    topProducts: [
      { name: 'Basic Tees', percentage: 50 },
      { name: 'Custom Short Pants', percentage: 51 },
      { name: 'Super Hoodies', percentage: 10 }
    ]
  };
  res.json(dashboardData);
});
// ============ END OF NEW ROUTES ============

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});