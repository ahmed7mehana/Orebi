const mongoose =require("mongoose")


module.exports=async()=>{
 try {
    await mongoose.connect(process.env.MONGO)
    console.log("connection successfully to mongo")
 } catch (error) {
    console.log("we have something wrong to connection with mongo",error)
 }
}