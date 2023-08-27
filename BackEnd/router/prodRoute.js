const { CreateProdCtrl, GetAllProdCtrl, DelProdCtrl} = require("../controllers/prodController")
const { photoUpload } = require("../middleware/photoUpload")

const router =require("express").Router()




//  /api/prod
router.route("/")
        .post(photoUpload.single("image"),CreateProdCtrl)
        .get(GetAllProdCtrl)
        

// /api/prod/64b25a89b569a791c5e6485d
router.route("/:id")
           .delete(DelProdCtrl)









module.exports=router