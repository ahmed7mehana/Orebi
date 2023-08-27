const expressAsyncHandler = require("express-async-handler");
const { User, validuserUpdate } = require("../model/User");


const fs =require("fs");
const path =require("path");
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../Utils/cloudnary");
const { use } = require("../router/userRoute");


/**
/**
 *@description  get all users
 * @route  /api/user/all-users
 * @method Get
 * @access private
 */
module.exports.GetAllusers=expressAsyncHandler(async(req,res)=>{
const users = await User.find().select("-password").populate("products")
res.status(200).json(users)
})  
/**
 *@description  get user profile by id
 * @route  /api/user/register
 * @method Get
 * @access private
 */

 module.exports.GetuserProfile=expressAsyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password").populate("products")
 if (!user) { return res.status(404).json({ message: "user not found" });}
   res.status(200).json(user);
 })  
 /**
 *@description  delete user profile
 * @route  /api/user/del-prof
 * @method Delete
 * @access private
 */
 module.exports.DeluserProfile=expressAsyncHandler(async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id)
  res.status(200).json({message:"user has been deleted"})
 })  


/**
 *@description make me admin
 * @route  /api/user/makeMeAdmin
 * @method put
 * @access private
 */
 module.exports.makeMeAdmin=expressAsyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id)
  if(!user){
    return res.status(404).json({message:"user not exist "})
}
  const updateData= await User.findByIdAndUpdate(req.params.id,{
    $set:{
        isAdmin:true,
    }
},{new:true})

  res.status(200).json(updateData)
  })  
  
  /**
 *@description remove me from admin
 * @route  /api/user/RemoveMeAdmin
 * @method put
 * @access private
 */
 module.exports.RemoveMeAdmin=expressAsyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id)
  if(!user){
    return res.status(404).json({message:"user not exist "})
}
  const updateData= await User.findByIdAndUpdate(req.params.id,{
    $set:{
        isAdmin:false,
    }
},{new:true})

  res.status(200).json(updateData)
  })  
