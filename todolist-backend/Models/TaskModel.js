const mongoose = require("mongoose");
const Joi = require('joi');  


const TaskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
}, {timestamps:true})


function validateTask(task) {
    const schema = Joi.object({
        userId: Joi.string().required(), 
        title: Joi.string().min(1).max(255),
        description: Joi.string().max(1000).allow(''), 
    });
    return schema.validate(task);
}

function validateUpdateTask(task) {
    const schema = Joi.object({
        title: Joi.string().min(1).max(255).optional(),
        description: Joi.string().max(1000).allow('').optional(), 
    });
    return schema.validate(task);
}


const Task = mongoose.model("Task" , TaskSchema)

module.exports={
    Task,
    validateTask,
    validateUpdateTask
}