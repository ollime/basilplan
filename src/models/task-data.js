/**
 * @module task-data
 * @description Manages data in the task table of the database.
 */
import { db } from "./database.js";

/** Stores a task in the database. */
function sendTask(task, list, position) {
  db.run(
    `
        INSERT OR REPLACE INTO tasks
        (task_name, list, position)
        VALUES (?, ?, ?);
        `,
    [task, list, position]
  );
  return task;
}

/** Deletes a task from the database. */
function deleteTask(task) {
  db.run(
    `
        DELETE FROM tasks
        WHERE task_name = ?;
    `,
    [task]
  );
  return task;
}

/** Retrieve all tasks from the database. */
async function getTasks() {
  return new Promise((resolve) => {
    db.serialize(function () {
      db.all(
        `SELECT * FROM tasks
                    ORDER BY list DESC;`,
        (err, rows) => {
          if (err) {
            resolve(err);
          }
          resolve(rows);
        }
      );
    });
  });
}

export { sendTask, deleteTask, getTasks };
