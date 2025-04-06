require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes'); // Add user routes
const athleteRoutes = require('./routes/athlete');
const googleFitRoutes = require('./routes/googleFit');

// Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const app = express();

// Middleware
app.use(cors({
  // env varibale forn frontend url 
  
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Add user routes
app.use('/api/athletes', athleteRoutes);
app.use('/api/google-fit', googleFitRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server runnifng on port ${PORT}`);
});