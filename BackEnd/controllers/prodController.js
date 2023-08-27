const fs =require("fs");
const path =require("path");
const expressAsyncHandler = require("express-async-handler");
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../Utils/cloudnary");
const { validprod, Product, validUpdateprod } = require("../model/Product");
/**
 *@description  Create
 * @route  /api/auth/create-product
 * @method post
 * @access private
 */
module.exports.CreateProdCtrl=expressAsyncHandler(async(req,res)=>{
    // [valid]
    if(!req.file){
        return res.status(400).json({message:" where the image ??"})
    }
    const {error} = validprod(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }

//upload image
const imgpath= path.join(__dirname,`../images/${req.file.filename}`)
const result= await cloudinaryUploadImage(imgpath)

//create meal
const NProduct= await Product.create({
    title:req.body.title,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:{
        url:result.secure_url,
        publicId:result.public_id
    },

})


 //sent res
res.status(201).json(NProduct)


 //remove img from server
fs.unlinkSync(imgpath)

})

    /**
 *@description  delete prod
 * @route  /api/auth/del-prod
 * @method put
 * @access private
 */
 module.exports.DelProdCtrl=expressAsyncHandler(async(req,res)=>{
        const prod =await Product.findById(req.params.id)

            if(!prod){ return res.status(400).json({message:"dont found any meals"})
        }else{
            await Product.findByIdAndDelete(prod)
            await cloudinaryRemoveImage(prod.image.publicId)
        res.status(200).json({message:"meal has been deleted"})
        }


        })
/**
 *@description  get all prod
 * @route  /api/auth/all-prod
 * @method get
 * @access private
 */
 module.exports.GetAllProdCtrl=expressAsyncHandler(async(req,res)=>{
//pagenation
  const meal_per_page=6
  const {pageNumber}=req.query
let prod

if(pageNumber){

prod=await Product.find().skip(pageNumber - 1).limit(meal_per_page).sort({createdAt:-1 }).populate("user", ["-password"]);
}else{
    prod = await Product.find().sort({createdAt:-1 }).populate("user", ["-password"]);
}
res.status(200).json(prod)
    })


