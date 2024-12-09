import { Line } from "react-chartjs-2";

function LineChart({chartData}) {
    const options = {
      plugins: {
        title: {
          display: true,
          text: "Hours spent by date",
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
            text: "Date"
          }
        },
        y: {
          title: {
            display: true,
            text: "Hours"
          }
        }
      },
      indexAxis: "x"
    }
  
    return (
      <div className="chart-container">
        <Line
          data={chartData}
          options={options}
        />
      </div>
    );
  };

export default LineChart;