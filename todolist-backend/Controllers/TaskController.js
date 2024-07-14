const asyncHandler = require("express-async-handler");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validateTask, validateUpdateTask } = require("../models/TaskModel");

/** 
* @desc     Get all Tasks 
* @route    /api/tasks/:userId
* @method   Get
* @access   public
*/ 
const getTasks = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    // Find tasks for the specific user using Prisma
    const tasks = await prisma.task.findMany({
        where: {
            userId: userId,
        },
    });

    if (tasks.length > 0) {
        res.status(200).json({ results: tasks.length, data: tasks });
    } else {
        res.status(404).json({ message: "Tasks not found" });
    }
});

/** 
* @desc     Get Task by ID
* @route    /api/task/:id
* @method   Get
* @access   public
*/ 
const getTaskById = asyncHandler(async (req, res) => {
    const taskId = req.params.id; // Assuming `id` is already a string or number

    // Find task by ID using Prisma
    try {
        const task = await prisma.task.findUnique({
            where: {
                id: taskId,
            },
        });

        if (task) {
            res.status(200).json({ data: task });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        // Handle any errors from Prisma
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


/** 
* @desc     Create new Task 
* @route    /api/task
* @method   POST
* @access   private
*/
const createTask = asyncHandler(async (req, res) => {
    const { error } = validateTask(req.body);
    
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // Create task using Prisma
    const newTask = await prisma.task.create({
        data: {
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
        },
    });

    // Get all tasks for the user after creating the task
    const tasks = await prisma.task.findMany({
        where: {
            userId: newTask.userId,
        },
    });

    res.status(201).json({ data: tasks });
});


/** 
* @desc     Update Task
* @route    /api/task/:id
* @method   PUT
* @access   private
*/
const updateTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id; // Assuming `id` is already a string or number
    const { error } = validateUpdateTask(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // Update task using Prisma
    try {
        const updatedTask = await prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                title: req.body.title,
                description: req.body.description,
            },
        });

        res.status(200).json({ data: updatedTask });
    } catch (error) {
        // Handle any errors from Prisma
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

/** 
* @desc     Delete Task by ID
* @route    /api/task/:id
* @method   DELETE
* @access   private 
*/
const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id; // Assuming `id` is already a string or number

    // Delete task using Prisma
    try {
        const deletedTask = await prisma.task.delete({
            where: {
                id: taskId,
            },
        });

        if (deletedTask) {
            res.status(200).json({ message: "The task has been deleted" });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        // Handle any errors from Prisma
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
