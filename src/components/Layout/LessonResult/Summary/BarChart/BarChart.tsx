// import { Bar } from 'react-chartjs-2';
// import {
//   Chart,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartOptions,
// } from 'chart.js';

// Chart.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const BarChart = ({ data, questions }: any) => {
//   const result = questions.map((_: any, index: any) => {
//     return index;
//   });
  
//   const options: ChartOptions<'bar'> = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           color: 'rgba(255, 255, 255, 0.7)',
//           font: {
//             size: 18
//           }
//         },
//       },
//       title: {
//         display: true,
//         text: 'Правильно или неправильно по вопросам',
//         color: 'rgba(255, 255, 255, 1)',
//         font: {
//           size: 18,
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           color: 'transparent',
//         },
//         ticks: {
//           color: 'rgba(255, 255, 255, 1)',
//         },
//       },
//       y: {
//         grid: {
//           color: 'transparent',
//         },
//         ticks: {
//           color: 'rgba(255, 255, 255, 1)',
//           callback: function(value: any) {
//             const labels = result;
//             return labels[Math.floor(value / 1)];
//           }
//         },
//         beginAtZero: true,
//         max: 10,
//       },
//     },
//   };

//   return <Bar data={data} options={options} />;
// };

// export default BarChart;

import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, questions }: any) => {
  const result = [0, ...questions.map((_: any, index: any) => index + 1)];
  
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 18
          }
        },
      },
      title: {
        display: true,
        text: 'Правильно или неправильно по вопросам',
        color: 'rgba(255, 255, 255, 1)',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'transparent',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 1)',
        },
      },
      y: {
        grid: {
          color: 'transparent',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 1)',
          callback: function(value: any) {
            return result[value];
          },
          stepSize: 1,
        },
        beginAtZero: true,
        max: questions.length,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
