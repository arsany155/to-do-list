const express = require("express")
const route = express.Router()

const {userRegistration, userLogin }=require("../Controllers/AuthController")

route.post("/Register", userRegistration)
route.post("/Login" , userLogin)



module.exports =route   