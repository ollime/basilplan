/** @file Retrieves and formats data for all charts and data tables. */
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";

import {
  formatDates,
  groupByDate,
  groupByTask
} from "../../src/api/data-formatting.js";
import { getAllLogData } from "../../src/api/log-api.js";
import BarChart from "./BarChart.jsx";
import DataTable from "./DataTable.jsx";
import LineChart from "./LineChart.jsx";

/** Manages data for all charts. */
function ChartApp() {
  /** Stores data for data table. @type {Object} */
  const [allData, setAllData] = useState(null);
  /** Stores data grouped by task for bar chart. @type {Object} */
  const [taskData, setTaskData] = useState(null);
  /** Stores data grouped by daet for line chart. @type {Object} */
  const [dateData, setDateData] = useState(null);

  useEffect(() => {
    let ignore = false;

    /** Retrieves all logged data and reformats for charts. */
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

    /** Groups log data by task. */
    async function formatTaskData(data) {
      setTaskData(formatChartData(groupByTask(data)));
    }

    /** Groups log data by task. */
    async function formatDateData(data) {
      setDateData(formatChartData(groupByDate(data)));
    }

    // adjusts colors for contrast on dark mode
    Chart.defaults.backgroundColor = "#36a2eb";
    Chart.defaults.borderColor = "rgba(231, 229, 228, 0.2)";
    Chart.defaults.color = "#b3b2b1";
    Chart.register(CategoryScale);

    return () => {
      ignore = true;
    };
  }, []);

  /** Sets chart options.
   *
   * @param {Object} logData Data in the exact format to display. The value should be set as "hours"
   */
  function formatChartData(logData) {
    const data = {
      labels: logData.map((item) => item.task_name),
      datasets: [
        {
          label: "hours",
          data: logData.map((item) => item.minutes),
          borderWidth: 2,
          pointStyle: false,
          borderColor: "#36a2eb",
          backgroundColor: "rgba(5, 155, 255, 0.4)"
        }
      ]
    };
    return data;
  }

  return (
    <div className="App">
      {taskData ? <BarChart chartData={taskData} /> : null}
      {dateData ? <LineChart chartData={dateData} /> : null}
      {allData ? <DataTable data={allData} /> : null}
    </div>
  );
}

export default ChartApp;
