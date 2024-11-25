export function sendLogData(task, minutes) {
    let dateTime = Date.now()
    fetch(`/api/sendLogData/${dateTime}/${task}/${minutes}`)
    .catch((err) => {
        console.log(err)
    })
}