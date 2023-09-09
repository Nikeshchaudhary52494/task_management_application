const Task = require("../models/taskModel")
const catchAsyncErrors = require("../middleware/catchAsyncError");

// create task
exports.createTask = catchAsyncErrors(async (req, res, next) => {
    const {
        tittle,
        description,
        status,

    } = req.body;

    const task = await Task.create({
        tittle,
        description,
        status,
        user:req.user._id,
    });
    res.status(201).json({
        success: true,
        task,
    })
})

// Get All tasks
exports.getALlTasks = catchAsyncErrors(async (req, res) => {
    const tasksCount = await Task.countDocuments({user:req.user._id});
    const tasks = await Task.find({user:req.user._id});
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

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })


    res.status(200).json({
        success: true,
        message: "Task updated Sucessfully",
        task
    });
})