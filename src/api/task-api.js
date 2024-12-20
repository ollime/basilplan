async function getAllTasks() {
    return fetch(`/api/getAllTasks`)
    .then((response) => {
        return response.text()
    })
    .then((text) => {
        return JSON.parse(text);
    })
    .catch((err) => {
        console.log(err)
    })
}

async function deleteTask(txt) {
    fetch(`/api/deleteTask/${txt}`)
    .catch((err) => {
        console.log(err)
    })
}

async function sendTask(txt) {
    fetch(`/api/sendTask/${txt}`)
    .catch((err) => {
        console.log(err)
    })
}

export {
    getAllTasks,
    deleteTask,
    sendTask
}