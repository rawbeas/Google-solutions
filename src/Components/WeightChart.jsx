import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const WeightChart = ({ weights, prediction }) => {
  const data = {
    labels: [
      ...weights.map(w => new Date(w.date).toLocaleDateString()),
      'Prediction'
    ],
    datasets: [{
      label: 'Weight (kg)',
      data: [...weights.map(w => w.value), prediction?.weightPrediction],
      borderColor: '#3b82f6',
      tension: 0.1
    }]
  };

  return (
    <div className="p-6 bg-zinc-800 rounded-lg">
      <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default WeightChart;
