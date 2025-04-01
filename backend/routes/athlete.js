const express = require('express');
const router = express.Router();
const Weight = require('../models/Weight');
const Prediction = require('../models/Prediction');
const fetchPredictions = require('../utils/fetchPredictions');
const auth = require('../middlewares/auth');

router.get('/:id/predictions', auth, async (req, res) => {
  try {
    const weights = await Weight.find({ userId: req.params.id })
      .sort({ date: -1 })
      .limit(30);

    const predictions = await fetchPredictions(req.params.id, weights);
    
    const predictionDoc = new Prediction({
      userId: req.params.id,
      ...predictions
    });

    await predictionDoc.save();
    res.json(predictionDoc);
  } catch (error) {
    res.status(500).json({ error: 'Prediction failed' });
  }
});
module.exports = router;