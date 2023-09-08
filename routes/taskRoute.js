const express = require("express");
const {
    createTask,
    getALlTasks,
    getOneTask,
    deleteTask,
    updateTask
} = require("../controllers/taskControler")

const router = express.Router();


router.route("/task/new").post(createTask);
router.route("/tasks").get(getALlTasks);
router.route("/task/:id").get(getOneTask).delete(deleteTask).put(updateTask);
// router.route()
module.exports = router;