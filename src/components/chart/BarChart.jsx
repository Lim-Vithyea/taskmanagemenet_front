import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = ({
  title,
  labels,
  datasets,
  height = 300,
  horizontal = false,
  stacked = false,
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' : 'x',
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: !!title,
        text: title || '',
      },
    },
    scales: {
      x: {
        stacked: stacked,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: stacked,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
    animation: {
      duration: 1000,
    },
  };

  // Default colors
  const defaultColors = [
    'rgba(37, 99, 235, 0.8)',
    'rgba(13, 148, 136, 0.8)',
    'rgba(239, 68, 68, 0.8)',
    'rgba(245, 158, 11, 0.8)',
    'rgba(34, 197, 94, 0.8)',
    'rgba(139, 92, 246, 0.8)',
    'rgba(249, 115, 22, 0.8)',
    'rgba(107, 114, 128, 0.8)',
  ];

  const processedDatasets = datasets.map((dataset, index) => ({
    ...dataset,
    backgroundColor: dataset.backgroundColor || defaultColors[index % defaultColors.length],
    borderColor: dataset.borderColor || defaultColors[index % defaultColors.length].replace('0.8', '1'),
    borderWidth: dataset.borderWidth || 1,
  }));

  const data = {
    labels,
    datasets: processedDatasets,
  };

  return (
    <div style={{ height: `${height}px` }}>
      <Bar options={options} data={data} />
    </div>
  );
};
