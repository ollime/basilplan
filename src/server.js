/** @file Express server for managing app routes. */

import express from "express";
import cors from "cors";

import { sendTask, deleteTask, getTasks } from "./models/task-data.js";
import { sendLogData, getLogData } from "./models/log-data.js";
import { generateTestData } from "./models/database.js";

const app = express();
const port = 5000;

app.use(cors());
app.options("*", cors());

app.get("/api", (req, res) => {
  res.send("this works");
});

// console.log(generateTestData())

// note to self: make sure you're actually sending responses

app.get("/api/sendTask/:task/:list/:position", (req, res) => {
  let task = req.params.task;
  let list = req.params.list;
  let position = req.params.position;

  console.log(list, position);

  sendTask(task, list, position);
  console.log("Task added: " + task);
  res.end();
});

app.get("/api/deleteTask/:task", (req, res) => {
  let task = req.params.task;
  deleteTask(task);
  console.log("Task deleted: " + task);
  res.end();
});

app.get("/api/getTasks", async (req, res) => {
  let tasks = await getTasks();
  console.log("Loading all tasks");
  res.send(tasks);
});

app.get("/api/sendLogData/:dateTime/:task/:minutes", (req, res) => {
  let dateTime = req.params.dateTime;
  let task = req.params.task;
  let minutes = req.params.minutes;
  console.log("Task logged: " + task + " for " + minutes + " minutes");
  sendLogData(dateTime, task, minutes);
  res.end();
});

app.get("/api/getLogData", async (req, res) => {
  let log = await getLogData();
  console.log("Loading log data");
  res.send(log);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
