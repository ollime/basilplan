import { db } from "./database.js";

function sendTask(task) {
    db.run(`
        INSERT INTO tasks
        (task_name)
        VALUES (?);
        `, [task])
    return task;
}

function deleteTask(task) {
    db.run(`
        DELETE FROM tasks
        WHERE task_name = ?;
    `, [task])
    return task;
}

async function getAllTasks() {
    return new Promise((resolve) => {
        db.serialize(function() {
            db.all("SELECT * FROM tasks;", (err, rows) => {
                if (err) {
                    resolve(err)
                }
                resolve(rows)
            })
        })    
    })
}

export { sendTask, deleteTask, getAllTasks }