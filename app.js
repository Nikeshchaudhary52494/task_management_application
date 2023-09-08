const express = require("express");
const app = express();
app.use(express.json());
const task = require("./routes/taskRoute");

//using routes
app.use("/api/v1", task)


module.exports = app;