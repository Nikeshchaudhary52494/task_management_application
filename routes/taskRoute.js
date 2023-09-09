const express = require("express");

const { isAuthenticatedUser } = require("../middleware/auth")
const {
    createTask,
    getALlTasks,
    getOneTask,
    deleteTask,
    updateTask
} = require("../controllers/taskControler")

const router = express.Router();


router.route("/task/new").post(isAuthenticatedUser, createTask);
router.route("/tasks").get(isAuthenticatedUser, getALlTasks);
router.route("/task/:id").get(isAuthenticatedUser, getOneTask).delete(isAuthenticatedUser, deleteTask).put(isAuthenticatedUser, updateTask);

module.exports = router;