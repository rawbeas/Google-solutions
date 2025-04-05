const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Athlete', 'Coach', 'Doctor'], required: true },
  fit_connected: { type: Boolean, default: false },
  googleFitTokens: {
    access_token: String,
    refresh_token: String,
    expiry_date: Number
  }
});

module.exports = mongoose.model('User', userSchema);

