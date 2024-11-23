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

app.get("/api/sendTask/:task", (req, res) => {
    let task = req.params.task
    sendTask(task)
    console.log("Task added: " + task)
    res.end()
})

app.get("/api/deleteTask/:task", (req, res) => {
    let task = req.params.task;
    deleteTask(task)
    console.log("Task deleted: " + task)
    res.end()
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})