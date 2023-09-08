const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: [true, "please Enter Task name"]
    },
    description: {
        type: String,
        required: [true, "Please Enter Task Description"]
    }, status: {
        type: String,
        default: "todo"
    },
    dueDate: {
        type: Date,
        require: true
    },
});

module.exports = mongoose.model("Task", taskSchema);