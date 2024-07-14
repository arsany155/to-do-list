const express = require("express");
const router = express.Router();

const { deleteTask, updateTask, getTaskById, getTasks, createTask } = require("../Controllers/TaskController");

router.post("/", createTask);
router.get("/tasks/:userId", getTasks);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);
router.get("/:id", getTaskById);

module.exports = router;
