import React from 'react';

const PredictionCard = ({ title, value, unit, description }) => (
  <div className="p-6 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <div className="text-3xl font-bold">
      {value?.toFixed(1)}
      <span className="text-sm ml-2 text-zinc-400">{unit}</span>
    </div>
    <p className="text-sm text-zinc-400 mt-2">{description}</p>
  </div>
);

export default PredictionCard;
