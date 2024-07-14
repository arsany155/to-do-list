const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { validateLoginUser, validateRegisterUser } = require("../Models/UserModel");

/** 
* @desc     Register new User
* @route    /api/auth/register
* @method   POST
* @access   public
*/
const userRegistration = asyncHandler(async (req, res) => {
    // Validate the input 
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    
    // Checking in database if user with same email exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    });
    if (existingUser) {
        return res.status(400).json({ message: "This user has already been registered" });
    }
    
    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Save the inputs in the database
    const newUser = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        },
    });

    res.status(201).json({ data: newUser });
});

/** 
* @desc     Login User
* @route    /api/auth/login
* @method   POST
* @access   public
*/
const userLogin = asyncHandler(async (req, res) => {
    // Validate the input 
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // Checking the email in database
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ data: user });
});

module.exports = {
    userRegistration,
    userLogin
};
