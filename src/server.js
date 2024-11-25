import express from "express"
import cors from "cors"

import { sendTask, deleteTask, getAllTasks } from "./models/task-data.js";
import { sendLogData } from "./models/log-data.js";
import { test } from "./models/database.js";

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

app.get("/api/getAllTasks", async (req, res) => {
    let tasks = await getAllTasks()
    console.log("Loading all tasks")
    res.send(tasks)
})

app.get("/api/sendLogData/:dateTime/:task/:minutes", (req, res) => {
    let dateTime = req.params.dateTime;
    let task = req.params.task;
    let minutes = req.params.minutes;
    console.log("Task logged: " + task + " for " + minutes + " minutes")
    sendLogData(dateTime, task, minutes)
    res.end()
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})