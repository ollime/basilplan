import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import { groupBy } from "../src/api/chart-api";
import { Bar } from "react-chartjs-2";
import { getAllLogData } from "./../src/api/log-api";


Chart.register(CategoryScale);

function ChartApp() {
    const [logData, setLogData] = useState(null)
    useEffect(() => {
      let ignore = false;
      async function getLogData() {
        await getAllLogData()
        .then((response) => {
          return groupBy(response)
        })
        .then((i) => {
          console.log(i)
          return formatChartData(i);
        })
        .then((data) => {
          if (!ignore) {
            setLogData(data)
          }
        })
      }
      getLogData()
        
        return () => {
          ignore = true;
        }
    }, [])

    return (
        <div className="App">
            { logData ? <BarChart chartData={logData} /> : null}
        </div>
    )
}

function formatChartData(logData) {
  const data = {
      labels: logData.map((item) => item.task_name),
      // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
      datasets: [{
          label: 'Popularity of colours',
          data: logData.map((item) => item.minutes),
          // you can set indiviual colors for each bar
          backgroundColor: [
            "#FFA400",
            "#009FFD",
            "#2A2A72",
            "#232528",
          ],
          borderWidth: 1,
        }]
  }
  return data;
}

function BarChart({chartData}) {
  return (
    <div className="chart-container">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};

export default ChartApp;