import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = ({
  title,
  labels,
  data,
  backgroundColor,
  borderColor,
  height = 300,
  donut = false,
  cutout
}) => {
  const defaultBackgroundColors = [
    'rgba(37, 99, 235, 0.8)',
    'rgba(13, 148, 136, 0.8)',
    'rgba(239, 68, 68, 0.8)',
    'rgba(245, 158, 11, 0.8)',
    'rgba(34, 197, 94, 0.8)',
    'rgba(139, 92, 246, 0.8)',
    'rgba(249, 115, 22, 0.8)',
    'rgba(107, 114, 128, 0.8)',
  ];

  const defaultBorderColors = defaultBackgroundColors.map(color =>
    color.replace('0.8', '1')
  );

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgroundColor || defaultBackgroundColors,
        borderColor: borderColor || defaultBorderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: !!title,
        text: title || '',
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    cutout: donut ? (cutout || '50%') : 0,
  };

  return (
    <div style={{ height: `${height}px` }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
