// const express = require("express");
import express from "express"
import cors from "cors"
const app = express()
const port = 5000;

app.use(cors())
app.options('*', cors())

app.get("/api", (req, res) => {
    console.log('a')
    res.send("this works")
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})