const axios = require('axios');

module.exports = async (userId, weights) => {
  const [weightRes, healthRes, expRes] = await Promise.all([
    axios.post(process.env.WEIGHT_API, { weights: weights.map(w => w.value) }),
    axios.post(process.env.HEALTH_API, { 
      data: weights.map(w => ({
        weight: w.value,
        timestamp: w.date
      }))
    }),
    axios.post(process.env.EXP_API, { userId })
  ]);

  return {
    weightPrediction: weightRes.data.prediction,
    healthScore: healthRes.data.score,
    experienceLevel: expRes.data.experience,
    confidence: weightRes.data.confidence
  };
};
