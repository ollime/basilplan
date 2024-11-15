const express = require("express");
const app = express()
const port = 3000;

app.set('view engine', 'ejs')
app.set("views", "views")
let ejs = require('ejs');

// TODO: try app.use(express.static("public"))
const path = require("path")
function getPath(url) {
    let endUrl = "public/" + url;
    if (url != "/") {
        endUrl += ".html";
    }
    return express.static(path.join(__dirname, endUrl));
}

function getTemplate(url) {
    let endUrl = "../views/" + url + ".ejs";
    return path.join(__dirname, endUrl);
}

app.use("/", getPath("/"))
app.use("/stats", getPath("stats"))
app.use("/settings", getPath("settings"))

app.get("/", (req, res) => {
    res.render(getTemplate("nav-bar"));
    res.send("main page")
})

app.get("/stats", (req, res) => {
    res.send("stats page")
})

app.get("/settings", (req, res) => {
    res.send("settings page")
})

/**
 * Adds a new item to the task list.
 */
app.get("/add-task", (req, res) => {
    // TODO: add in taskname variable
    return res.render(getTemplate("task-item"), {data: "test"})
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})