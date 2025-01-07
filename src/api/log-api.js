/** 
 * @module log-api
 * @description Fetch functions related to the log table.
 */

function sendLogData(task, minutes) {
    let dateTime = Date.now()
    fetch(`/api/sendLogData/${dateTime}/${task}/${minutes}`)
    .catch((err) => {
        console.log(err)
    })
}

async function getAllLogData() {
    return await fetch(`/api/getLogData`)
    .then((response) => {
        return response.json();
    })
    .then((text) => {
        return text;
    })
    .catch((err) => {
        console.log(err)
    })
}

export {
    sendLogData,
    getAllLogData
}