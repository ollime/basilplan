const express = require("express");
const app = express()
const port = 3000;

const path = require("path")

function getPath(url) {
    let endUrl = "public/" + url;
    if (url != "/") {
        endUrl += ".html";
    }
    return express.static(path.join(__dirname, endUrl));
}

app.use("/", getPath("/"))
app.use("/stats", getPath("stats"))
app.use("/settings", getPath("settings"))

app.get("/", (req, res) => {
    res.send("main page")
})

app.get("stats", (req, res) => {
    res.send("stats page")
})

app.get("settings", (req, res) => {
    res.send("settings page")
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})