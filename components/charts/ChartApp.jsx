import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import { groupByTask, groupByDate, formatDates } from "../../src/api/data-formatting.js";
import { getAllLogData } from "../../src/api/log-api.js";
import BarChart from "./BarChart.jsx";
import LineChart from "./LineChart.jsx";
import DataTable from "./DataTable.jsx";

Chart.register(CategoryScale);

function ChartApp() {
  const [allData, setAllData] = useState(null);
  const [taskData, setTaskData] = useState(null);
  const [dateData, setDateData] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function getData() {
      await getAllLogData()
        .then((response) => {
          return formatDates(response);
        })
        .then((data) => {
          if (!ignore) {
            setAllData(data);
            formatTaskData(data);
            formatDateData(data);
          }
        });
    }

    getData();

    async function formatTaskData(response) {
      setTaskData(formatChartData(groupByTask(response)));
    }

    async function formatDateData(response) {
      setDateData(formatChartData(groupByDate(response)));
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="App">
      {taskData ? <BarChart chartData={taskData} /> : null}
      {dateData ? <LineChart chartData={dateData} /> : null}
      {allData ? <DataTable data={allData} /> : null}
    </div>
  );
}

function formatChartData(logData) {
  const data = {
    labels: logData.map((item) => item.task_name),
    datasets: [
      {
        label: "hours",
        data: logData.map((item) => item.minutes),
        borderWidth: 2,
        pointStyle: false
      }
    ]
  };
  return data;
}

export default ChartApp;
