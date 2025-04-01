const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weightPrediction: Number,
  healthScore: Number,
  experienceLevel: Number,
  confidence: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', predictionSchema);
