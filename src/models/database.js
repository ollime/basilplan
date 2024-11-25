import sqlite3 from "sqlite3"
import path from "path"

const __dirname = import.meta.dirname;
const dbPath = path.join(__dirname, "/../../databases/test54.sqlite3")

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
    db.serialize(() => {
        db.exec(`
            CREATE TABLE IF NOT EXISTS tasks (
            task_name TEXT NOT NULL PRIMARY KEY
            );
        `)
        db.exec(`
            CREATE TABLE IF NOT EXISTS log (
            date INTEGER NOT NULL PRIMARY KEY,
            task_name TEXT NOT NULL,
            minutes INTEGER NOT NULL
            );
        `)
    })
    return db
}

function test() {
    // generate test data
    // TODO: write this function
}

export { db, test }