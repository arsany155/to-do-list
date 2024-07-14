const asynchandler = require("express-async-handler")
const {User} =require("../Models/UserModel")



/** 
* @desc     Get All Users
* @route    /api/users
* @method   GET
* @access   private (only Admin)
*/
const getUsers = asynchandler(async (req,res) => {
    const users = await User.find()

    if (users){
        res.status(200).json({results: users.length ,data: users})
    }else {
        res.status(404).json({message:"User not found"})
    }
})


/** 
* @desc     Get  User by id
* @route    /api/users/:id
* @method   GET
* @access   private (only Admin & user him self)
*/
const getUserbyId = asynchandler(async(req , res) => {
    var id = req.params.id
    if(!id){
        id = req.user._id
    }
    const user = await User.findById(id).select("-password")
    if(user){
        res.status(200).json(user)
    }else {
        res.status(400).json({message: "user not found"})
    }
})


/** 
* @desc     Update User
* @route    /api/users/:id
* @method   PUT
* @access   private
*/
const UpdateUser = asynchandler(async(req,res) => {
    const { error } = validateUpdateUser(req.body);

    if(error){
        return res.status(400).json({message:error.details[0].message})   
    }


    const updateUer = await User.findByIdAndUpdate(req.params.id ,{
        $set: {
            name: req.body.name,
            email: req.body.email,
        }
    }, {new: true})
    res.status(200).json(updateUer)
})



/** 
* @desc     delete User by id
* @route    /api/users/:id
* @method   DELETE
* @access   private (only Admin & user him self)
*/
const Deleteuser = asynchandler(async(req,res) => {
    const user = await User.findById(req.params.id)
    if(user){
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "the user has been deleted"})
    }else {
        res.status(400).json({message: "user not found"})
    }
})



module.exports={
    getUsers,
    getUserbyId,
    UpdateUser,
    UpdateUserPassword,
    Deleteuser
}