import express from "express"
import cors from "cors"

import { sendTask, deleteTask, test } from "./models/task-data.js"

const app = express()
const port = 5000;

app.use(cors())
app.options('*', cors())

app.get("/api", (req, res) => {
    res.send("this works")
})

// note to self: make sure you're actually sending responses

app.get("/api/sendTask/:id/:task", (req, res) => {
    let [id, task] = [req.params.id, req.params.task]
    sendTask(id, task)
    console.log("Task added: " + id, task)
    res.end()
})

app.get("/api/deleteTask/:id", (req, res) => {
    let id = req.params.id;
    deleteTask(id)
    console.log("Task deleted: " + id)
    res.end()
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})