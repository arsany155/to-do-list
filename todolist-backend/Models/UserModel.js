const mongoose = require("mongoose");
const Joi = require('joi');  

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength:100,
        minlength:2 
    },
    email: {
        type: String,
        required: true,
        unique: [true , "the email already exist"],
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength:6
    }
}, {timestamps:true})

//Validate Register User
function validateRegisterUser(obj){
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        email: Joi.string().trim().required().email(),
        password: Joi.string().min(6).required(), // Add this line
    });
    return schema.validate(obj); 
}

//Validate Login User
function validateLoginUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().required().email(),
        password: Joi.string().trim().required(),
    });
    return schema.validate(obj); 
}

const User = mongoose.model("User" , UserSchema);

module.exports={
    User,
    validateLoginUser,
    validateRegisterUser,
}
