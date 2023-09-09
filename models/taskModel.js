const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
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
    createDate:{
        type:Date
    },
    dueDate: {
        type:Date,
        require: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }
});

module.exports = mongoose.model("Task", taskSchema);