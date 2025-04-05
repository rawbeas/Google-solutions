const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  source: { type: String, enum: ['manual', 'google_fit'], default: 'manual' }
});

module.exports = mongoose.model('Weight', weightSchema);
