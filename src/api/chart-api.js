/** Data formatting for charts. */
import { getAllLogData } from "./log-api.js";

const Data = [
    {
        id: 1,
        name: "this"
    },
    {
        id: 2,
        name:"is"
    },
    {
        id: 3,
        name: "a"
    },
    {
        id: 2,
        name: "test"
    }
]

function groupBy(data) {
    let grouped = Object.groupBy(data, ({task_name}) => task_name)
    let newData = []
    for (let i in grouped) {
        newData.push({
            task_name: grouped[i][0].task_name,
            minutes: grouped[i].reduce((a,b) => a + b.minutes, 0)
        })
    }
    return newData;
}

export {
    Data,
    groupBy
}