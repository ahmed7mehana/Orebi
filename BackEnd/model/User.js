const joi=require("joi")
const mongoose =require("mongoose")
const jwt = require("jsonwebtoken")

const UserSchema= new mongoose.Schema({
    profilePhoto: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
            publicId: null,
        }
    },
username:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:100,
        unique: true,
    },
email:{
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
    },
password:{
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
isAdmin:{
    type:Boolean,
    default:false
},
isAccountVerified:{
    type:Boolean,
    default:false
},
},{
    timestamps:true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

UserSchema.virtual("products", {
    ref:"Product",
    foreignField:"user",
    localField: "_id",
});


//Generate Auth Token
UserSchema.methods.generateAuthToken=function(){
    return jwt.sign({id:this._id,isAdmin: this.isAdmin},process.env.JWT_SECRET)
    }
     

const User=mongoose.model("User", UserSchema)


// validation register
function validRegister(obj){
    const schema=joi.object({
        username:joi.string().trim().min(2).max(100).required(),
        email:joi.string().trim().min(2).max(100).required().email(),
        password:joi.string().trim().min(8).required(),
     })
     return schema.validate(obj)
}
// validation login
function validLogin(obj){
    const schema=joi.object({
        email:joi.string().trim().min(2).max(100).required().email(),
        password:joi.string().trim().min(8).required(),
     })
     return schema.validate(obj)
}
//valid update 
function validuserUpdate(obj){
    const schema=joi.object({
        username:joi.string().trim().min(2).required(),
     })
     return schema.validate(obj)
}

// Validate Email
function validateEmail(obj) {
    const schema =joi.object({
        email:joi.string().trim().min(5).max(100).required().email(),
    });
    return schema.validate(obj);
}

// Validate New Password
// function validateNewPassword(obj) {
//     const schema =joi.object({
//         password: passwordComplexity().required(),
//     });
//     return schema.validate(obj);
// }



//func
module.exports={
User,
validRegister,
validLogin,
validuserUpdate,
validateEmail,
// validateNewPassword
}