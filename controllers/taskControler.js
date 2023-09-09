const Task = require("../models/taskModel")
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");

// create task
exports.createTask = catchAsyncErrors(async (req, res, next) => {
    const {
        title,
        description,
        status,
        dueDate
    } = req.body;


    // checking for all enteries
    if (!title || !description || !dueDate) {
        return next(new ErrorHandler("All fields are required", 400))
    }

    // Checking DueDate
    let date1 = new Date(dueDate).getTime();
    let date2 = new Date().getTime();
    if (date1 < date2) {
        return next(new ErrorHandler("Due date is invalid"))
    }

    // checking task Status
    const statusOptions = ["todo", "process", "done"];
    if (!statusOptions.includes(status)) {
        return next(new ErrorHandler(`invalid status! , available options are ${statusOptions} `))
    }

    const task = await Task.create({
        title,
        description,
        status,
        createDate: Date.now(),
        dueDate: dueDate,
        user: req.user._id,
    });
    res.status(201).json({
        success: true,
        task,
    })
})

// Get All tasks
exports.getALlTasks = catchAsyncErrors(async (req, res) => {
    const tasksCount = await Task.countDocuments({ user: req.user._id });
    const tasks = await Task.find({ user: req.user._id });
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
    else {
        res.status(200).json({
            success: true,
            task
        });
    }
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

// Updating Task   
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