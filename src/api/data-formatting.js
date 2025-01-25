/**
 * @module data-formatting
 * @description Formats data for charts.
 */

function groupByTask(data) {
  let grouped = Object.groupBy(data, ({ task_name }) => task_name);
  let newData = [];
  for (let i in grouped) {
    newData.push({
      task_name: grouped[i][0].task_name,
      minutes: formatToHours(grouped[i])
    });
  }
  return newData;
}

function groupByDate(data) {
  let grouped = Object.groupBy(data, ({ date }) => date);
  let newData = [];
  for (let i in grouped) {
    newData.push({
      task_name: grouped[i][0].date,
      minutes: formatToHours(grouped[i])
    });
  }
  return newData;
}

function formatDates(data) {
  let newData = [];
  for (let i in data) {
    newData.push({
      date: formatMMDDYY(data[i].date),
      minutes: data[i].minutes,
      task_name: data[i].task_name
    });
  }
  return newData;
}

function formatMMDDYY(date) {
  let dateObj = new Date(date * 1000);
  let formattedDate = dateObj.toLocaleString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"
  });
  return formattedDate;
}

function formatToHours(data) {
  return data.reduce((a, b) => a + b.minutes / 60, 0);
}

export { groupByTask, groupByDate, formatDates };
