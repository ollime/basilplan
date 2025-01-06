import { db } from "./database.js"

function sendLogData(dateTime, task, minutes) {
    db.exec(`
        INSERT OR REPLACE INTO log
        (date, task_name, minutes)
        VALUES (?, ?, ?);
    `, 
    (`${dateTime}, "${task}", ${minutes}`))
}

async function getLogData() {
    return new Promise((resolve) => {
        db.serialize(function() {
            db.all("SELECT * FROM log;", (err, rows) => {
                if (err) {
                    resolve(err)
                }
                resolve(rows)
            })
        })    
    })
}

export { sendLogData, getLogData }