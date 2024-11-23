import sqlite3 from "sqlite3"
import path from "path"

const __dirname = import.meta.dirname;
const dbPath = path.join(__dirname, "/../../databases/test46.sqlite3")

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        console.log("Creating new database at " + dbPath)
        createDatabase();
    }
    else {
        console.log(err)
    }
})

function createDatabase() {
    db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            console.log(err);
        }
    })
    createTables()
    return db;
}

function createTables() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
        task_name TEXT NOT NULL PRIMARY KEY
        );`)
    return db
}

function sendTask(task) {
    db.exec(`
        INSERT OR REPLACE INTO tasks
        (task_name)
        VALUES ("${task}");
        `)
    return task;
}

function deleteTask(task) {
    db.exec(`
        DELETE FROM tasks
        WHERE task_name = "${task}";
    `)
    return task;
}

function test() {
    // let string = db.all("SELECT * FROM tasks", [], (err, rows) => {
    //     console.log(rows)
    // })
    // return string;
}

export { sendTask, deleteTask, test }