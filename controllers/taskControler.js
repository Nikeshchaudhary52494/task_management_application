const Task = require("../models/taskSchema")
const catchAsyncErrors = require("../middleware/catchAsyncError");

// create task
exports.createTask = catchAsyncErrors(async (req, res, next) => {
    const task = await Task.create(req.body);
    res.status(201).json({
        success: true,
        task,
    })
})

// Get All tasks
exports.getALlTasks = catchAsyncErrors(async (req, res) => {
    const tasksCount = await Task.countDocuments();
    const tasks = await Task.find();
    res.status(200).json({
        success: true,
        tasks,
        tasksCount,
    });
});

// get One Task by Id
exports.getOneTask = catchAsyncErrors(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404).json({
            success: false,
            message: "Task not Found  or invalid Id"
        })
    }
    res.status(200).json({
        success: true,
        task
    });
});

// Delete Task by Id
exports.deleteTask = catchAsyncErrors(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404).json({
            success: false,
            message: "Task not Found  or invalid Id"
        })
    }
    await Task.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        message: "Task deleted Sucessfully"
    });
});

exports.updateTask = catchAsyncErrors(async (req, res, next) => {
    let task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404).json({
            success: false,
            message: "Task not Found  or invalid Id"
        })
    }

    task2 = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })


    res.status(200).json({
        success: true,
        message: "Task updated Sucessfully",
        task2
    });
})