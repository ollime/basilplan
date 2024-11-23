import sqlite3 from "sqlite3"
import path from "path"

const __dirname = import.meta.dirname;
const dbPath = path.join(__dirname, "/../../databases/test31.sqlite3")

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    console.log(err)
    if (err && err.code == "SQLITE_CANTOPEN") {
        console.log('eep')
        createDatabase();
    }
})

function createDatabase() {
    console.log("eep")
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
        CREATE TABLE tasks (
        id INTEGER NOT NULL PRIMARY KEY,
        task_name TEXT NOT NULL
        );`)
    console.log(db)
    return db
}

function sendTask(id, task) {
    db.exec(`
        INSERT OR REPLACE INTO tasks
        (id, task_name)
        VALUES (${id}, "${task}")
        `)
    return task;
}

function deleteTask(id) {
    db.exec(`
        DELETE FROM tasks
        WHERE rowid = ${id}
    `)
}

function test() {
    // let string = db.all("SELECT * FROM tasks", [], (err, rows) => {
    //     console.log(rows)
    // })
    // return string;
}

export { sendTask, deleteTask, test }