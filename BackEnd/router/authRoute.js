const { RegisterCtrl, LoginCtrl, verifyUserAccountCtrl } = require("../controllers/authController")

const router = require("express").Router()


// /api/auth/register
router.post("/register", RegisterCtrl)

//  /api/auth/login
router.post("/login", LoginCtrl)




// /api/auth/:userId/verify/:token
router.get("/:userId/verify/:token", verifyUserAccountCtrl);

module.exports = router