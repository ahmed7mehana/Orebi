const { GetAllusers, GetuserProfile, DeluserProfile, makeMeAdmin, RemoveMeAdmin, profilePhotoUploadCtrl } = require("../controllers/userControiier")
const { photoUpload } = require("../middleware/photoUpload")
const router = require("express").Router()


router.route("/")
        .get(GetAllusers)


// /api/user/profile/
router.route("/profile/:id")
        .get(GetuserProfile)
        .delete(DeluserProfile)

// /api/user/makeMeAdmin/
router.route("/makeMeAdmin/:id").put(makeMeAdmin)

// /api/user/RemoveMeAdmin/
router.route("/RemoveMeAdmin/:id").put(RemoveMeAdmin)




module.exports = router