
const mongoose =require("mongoose")
const joi=require("joi")


const ProductSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200,
      },
      description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
      },
      image: {
        type: Object,
        default: {
          url: "",
          publicId: null,
        },
      },
      category: {
        type: String,
        required: true,
      },
      price:{
        type:Number,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200,
      },
      user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      },{
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
      }
  );
  

const Product = mongoose.model("Product", ProductSchema);
  
  
function validprod(obj){
    const schema=joi.object({
        title:joi.string().trim().min(2).max(100).required(),
        description:joi.string().trim().min(2).required(),
        category: joi.string().trim().required(),
        price:joi.number().min(1).required(),
     })
     return schema.validate(obj)
}

function validUpdateprod(obj){
    const schema=joi.object({
        title:joi.string().trim().min(2).max(100),
        description:joi.string().trim().min(2),
        category: joi.string().trim(),
        price:joi.number().min(1),
     })
     return schema.validate(obj)
}



module.exports={
Product,
validprod,
validUpdateprod
}

