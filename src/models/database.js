/**
 * @module database
 * @description General database creation and management.
 */

import sqlite3 from "sqlite3";
import path from "path";

/* Gets the database path
Changing the path provided in dbPath will create a new database if needed */
const __dirname = import.meta.dirname;
const dbPath = path.join(__dirname, "/../../databases/test87.sqlite3");

// defines the db variable. creates database if it doesn't already exist
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err && err.code == "SQLITE_CANTOPEN") {
    console.log("Creating new database at " + dbPath);
    createDatabase();
  } else {
    console.log(err);
  }
});

/** Creates database file. */
function createDatabase() {
  db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.log(err);
    }
  });
  createTables();
  return db;
}

/** Adds tables to database file. */
function createTables() {
  db.serialize(() => {
    db.exec(`
            CREATE TABLE IF NOT EXISTS tasks (
            task_name TEXT NOT NULL PRIMARY KEY,
            list TEXT,
            position TEXT
            );
        `);
    db.exec(`
            CREATE TABLE IF NOT EXISTS log (
            date INTEGER NOT NULL PRIMARY KEY,
            task_name TEXT NOT NULL,
            minutes TEXT NOT NULL
            );
        `);
  });
  return db;
}

/** Test data generation. */
function generateTestData() {
  let now = 1732;
  let max = 900000;
  let tasks = ["a", "a", "b", "b", "c", "d", "e"];

  function getRandomDate() {
    return Number(`${now}${Math.floor(Math.random() * max) + 1000}`);
  }
  function getRandomTask() {
    return tasks[Math.floor(Math.random() * 7)];
  }

  const testData = [];
  for (let i = 0; i < 15; i++) {
    testData.push({ date: getRandomDate(), task_name: getRandomTask(), minutes: 5 });
  }
  for (let i = 0; i < 30; i++) {
    testData.push({ date: getRandomDate(), task_name: getRandomTask(), minutes: 15 });
  }
  for (let i = 0; i < 30; i++) {
    testData.push({ date: getRandomDate(), task_name: getRandomTask(), minutes: 25 });
  }

  db.serialize(() => {
    const stmt = db.prepare(`
            INSERT INTO log
            (date, task_name, minutes)
            VALUES (?, ?, ?)
        `);

    testData.forEach((data) => stmt.run(data.date, data.task_name, data.minutes));

    stmt.finalize();
  });

  db.serialize(() => {
    let taskNames = [
      "task name",
      "task name 1",
      "task name 2",
      "task name 3",
      "task name 4",
      "task name 5",
      "task name 6",
      "task name 7"
    ];
    let testData = [];
    taskNames.map((task, i) => {
      testData.push({
        taskName: task,
        // i % 3 to get values of 0, 1, or 2
        list: i % 3,
        position: i % 3
      });
    });
    const stmt = db.prepare(`
            INSERT INTO tasks
            (task_name, list, position)
            VALUES (?, ?, ?)
        `);

    testData.forEach((data) => stmt.run(data.taskName, data.list, data.position));

    stmt.finalize();
  });

  return "TEST DATA GENERATED";
}

export { db, generateTestData };
