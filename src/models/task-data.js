/** 
 * @module task-data
 * @description Manages data in the task table of the database.
 */

import { db } from "./database.js";

/** Stores a task in the database. */
function sendTask(task) {
    db.run(`
        INSERT INTO tasks
        (task_name)
        VALUES (?);
        `, [task])
    return task;
}

/** Deletes a task from the database. */
function deleteTask(task) {
    db.run(`
        DELETE FROM tasks
        WHERE task_name = ?;
    `, [task])
    return task;
}

/** Retrieve all tasks from the database. */
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