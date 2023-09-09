const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());
const task = require("./routes/taskRoute");
const user = require("./routes/userRoute.js")

//using routes
app.use("/api/v1", task)
app.use("/api/v1", user)


module.exports = app;