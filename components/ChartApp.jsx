import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import { groupByTask, groupByDate } from "../src/api/data-formatting";
import { Bar, Line } from "react-chartjs-2";
import { getAllLogData } from "./../src/api/log-api";

Chart.register(CategoryScale);

function ChartApp() {
    const [taskData, setTaskData] = useState(null)
    const [dateData, setDateData] = useState(null)

    useEffect(() => {
      let ignore = false;
      async function getTaskData() {
        await getAllLogData()
        .then((response) => {
          return groupByTask(response);
        })
        .then((i) => {
          return formatChartData(i);
        })
        .then((data) => {
          if (!ignore) {
            setTaskData(data)
          }
        })
      }
      getTaskData()

      async function getDateData() {
        await getAllLogData()
        .then((response) => {
          return groupByDate(response);
        })
        .then((i) => {
          return formatChartData(i);
        })
        .then((data) => {
          if (!ignore) {
            setDateData(data)
          }
        })
      }
      getDateData()
        
        return () => {
          ignore = true;
        }
    }, [])

    return (
        <div className="App">
            { taskData ? <BarChart chartData={taskData} /> : null}
            { dateData ? <LineChart chartData={dateData} /> : null}
        </div>
    )
}

function formatChartData(logData) {
  const data = {
      labels: logData.map((item) => item.task_name),
      // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
      datasets: [{
          label: "hours",
          data: logData.map((item) => item.minutes),
          // you can set indiviual colors for each bar
          // backgroundColor: [
          //   "#DE3C4B",
          //   "#FFA400",
          //   "#009FFD",
          //   "#2A2A72",
          //   "#232528",
          // ],
          borderWidth: 2,
          pointStyle: false
        }]
  }
  return data;
}

function BarChart({chartData}) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Bar chart",
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

function LineChart({chartData}) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Line Chart",
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

export default ChartApp;