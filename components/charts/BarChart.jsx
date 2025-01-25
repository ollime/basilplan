/** @file Bar chart ordered by tasks. */
import { Bar } from "react-chartjs-2";

/** Displays a bar chart.
 *
 * @chartData Time data grouped by task.
 */
function BarChart({ chartData }) {
  // defines bar chart settings
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Hours spent by task",
        align: "end"
      },
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hours"
        }
      },
      y: {
        title: {
          display: true,
          text: "Task"
        }
      }
    },
    indexAxis: "y"
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default BarChart;
