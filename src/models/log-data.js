/**
 * @module log-data
 * @description Manages data in the log table of the database.
 */

import { db } from "./database.js";

/** Stores data from the timer to the database. */
function sendLogData(dateTime, task, minutes) {
  db.run(
    `
        INSERT INTO log
        (date, task_name, minutes)
        VALUES (?, ?, ?);
    `,
    [dateTime, task, minutes]
  );
}

/** Retrieves all log data from the database. */
async function getLogData() {
  return new Promise((resolve) => {
    db.serialize(function () {
      db.all("SELECT * FROM log;", (err, rows) => {
        if (err) {
          resolve(err);
        }
        resolve(rows);
      });
    });
  });
}

export { sendLogData, getLogData };
