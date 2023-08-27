const path=require("path")
const multer=require("multer")

//photo storage
const photoStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../images"))
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g,"-")+file.originalname)
    }
})

//photo Upload Midd
const photoUpload=multer({
    storage:photoStorage,
    fileFilter:function(re,file,cb){
        if(file.mimetype.startsWith("image")){
            cb(null,true)
        }else{
            cb({message:"unsupported file"},false)
        }
    },
limits:{fieldSize:1024 * 1024} //1m
})


module.exports={
    photoUpload,
}