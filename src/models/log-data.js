import { db } from "./database.js"

function sendLogData(dateTime, task, minutes) {
    db.exec(`
        INSERT OR REPLACE INTO log
        (date, task_name, minutes)
        VALUES (${dateTime}, "${task}", ${minutes});
    `)
}

export { sendLogData }