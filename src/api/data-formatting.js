/** Data formatting for charts. */

function groupByTask(data) {
    let grouped = Object.groupBy(data, ({task_name}) => task_name)
    let newData = []
    for (let i in grouped) {
        newData.push({
            task_name: grouped[i][0].task_name,
            minutes: grouped[i].reduce((a,b) => a + b.minutes / 60, 0),
        })
    }
    return newData;
}

function groupByDate(data) {
    let grouped = Object.groupBy(data, ({date}) => formatMMDDYY(date))
    let newData = []
    for (let i in grouped) {
        newData.push({
            task_name: formatMMDDYY(grouped[i][0].date),
            minutes: grouped[i].reduce((a,b) => a + b.minutes / 60, 0),
        })
    }
    return newData;   
}

function formatMMDDYY(date) {
    let dateObj = new Date(date*1000);
    let formattedDate = dateObj.toLocaleString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
    })
    return formattedDate;
}

export {
    groupByTask,
    groupByDate
}