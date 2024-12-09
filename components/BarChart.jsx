import { Bar } from "react-chartjs-2";

function BarChart({chartData}) {
    const options = {
      plugins: {
        title: {
          display: true,
          text: "Hours spent by task",
          align: "end"
        },
        legend: {
          display: false
        },
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
    }
  
    return (
      <div className="chart-container">
        <Bar
          data={chartData}
          options={options}
        />
      </div>
    );
  };
  
export default BarChart;  