const sqlite3 = require("sqlite3").verbose()
const path = require("path")

const dbPath = path.join(__dirname, "/../../databases/test.sqlite3")

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        createDatabase();
    }
})

function createDatabase() {
    var newdb = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.log(err);
        }
        createTables()
    });
    return newdb;
}

function createTables() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER NOT NULL PRIMARY KEY,
        task_name TEXT NOT NULL
        );`)
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

function test() {
    // db.run(` INSERT INTO tasks VALUES ("djfkslf")`);

    let string = db.all("SELECT * FROM tasks", [], (err, rows) => {
        console.log(rows)
    })
    return string;
}

module.exports = {
    test: test(),
    createDatabase: createDatabase(),
    sendTask: (id, task) => {sendTask(id, task)}
}