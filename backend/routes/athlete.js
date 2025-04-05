const express = require('express');
const router = express.Router();
const Weight = require('../models/Weight');
const Prediction = require('../models/Prediction');
const fetchPredictions = require('../utils/fetchPredictions');
const auth = require('../middlewares/auth');

router.get('/:id/predictions', auth, async (req, res) => {
  console.log("check2")
  try {
    console.log("check21")
    console.log("Returning dummy prediction data...");
    const weights = await Weight.find({ userId: req.params.id })
      

    // const predictions = await fetchPredictions(req.params.id, weights);
    // console.log("check3")
    // const predictionDoc = new Prediction({
    //   userId: req.params.id,
    //   ...predictions
    // });
    // console.log("check4")
    // await predictionDoc.save();
    console.log("check3")
    res.json({
      "userId": "123abc456",
      "weightPrediction": 72.3,
      "healthScore": 85.7,
      "experienceLevel": 2.5,
      "createdAt": "2025-04-04T12:34:56.789Z"
    }
    );
  } catch (error) {
    res.status(500).json({ error: 'Prediction failed' });
  }
});
module.exports = router;