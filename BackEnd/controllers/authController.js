const expressAsyncHandler = require("express-async-handler");
const { validRegister,validLogin } = require("../model/User");
const bcrypt=require("bcryptjs");
const { User } = require("../model/User");
const crypto = require("crypto");
const VerificationToken = require("../model/VerificatiionToken");
const sendEmail = require("../Utils/sendEmail");




/**
 *@description  register
 * @route  /api/auth/register
 * @method post
 * @access private
 */
 module.exports.RegisterCtrl=expressAsyncHandler(async(req,res)=>{
    //[1]validation
    const{error}=validRegister(req.body)
    if(error){return res.status(400).json({message:error.details[0].message})}
    //[2]is user exist
    let user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({message:"user already exist"})}
    //[3]hash pass
    const salt = await bcrypt.genSalt(10)
    const hashpassword=await bcrypt.hash(req.body.password,salt)
    //[4]new user and add it to db
    user=new User({
        username:req.body.username,
        email:req.body.email,
        password:hashpassword,
    })
    await user.save()

      // Creating new VerificationToken & save it toDB
  const verifictionToken = new VerificationToken({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  await verifictionToken.save();

  // Making the link
  const link = `${process.env.CLIENT_DOMAIN}/user/${user._id}/verify/${verifictionToken.token}`;

  // Putting the link into an html template
  const htmlTemplate = `
    <div>
      <p> Click on the link below to verify your email</p>
      <a href="${link}">Verify</a>
    </div>`;

  // Sending email to the user
  await sendEmail(user.email, "Verify Your Email", htmlTemplate);
 

    //[5]send a res to client
    res.status(201).json({message:"We sent to you an email, please verify your email address"})
   })  


/**
 *@description  login
 * @route  /api/auth/login
 * @method post
 * @access private
 */
 module.exports.LoginCtrl=expressAsyncHandler(async(req ,res)=>{
    //[valid]
    const {error} =validLogin(req.body)
        if(error){
            return res.status(400).json({message:error.details[0].message}) 
                }  
    //[2]is user exist
let user = await User.findOne({email:req.body.email})
if(!user){
    return res.status(400).json({message:"is not exist"}) 
        }
    //[3]hash pass
const ispassmatch= await bcrypt.compare(req.body.password,user.password)
if(!ispassmatch){
    return res.status(400).json({message:"invalid email or password"})}



    
  if (!user.isAccountVerified) {
    let verificationToken = await VerificationToken.findOne({
      userId: user._id,
    });

    if (!verificationToken) {
      verificationToken = new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await verificationToken.save();
    }

    const link = `${process.env.CLIENT_DOMAIN}/user/${user._id}/verify/${verificationToken.token}`;

    const htmlTemplate = `
    <div>
      <p>Click on the link below to verify your email</p>
      <a href="${link}">Verify</a>
    </div>`;

    await sendEmail(user.email, "Verify Your Email", htmlTemplate);

    return res.status(400).json({
      message: "We sent to you an email, please verify your email address",
    });
  }

//token
const token = user.generateAuthToken()

//[5]send a res to client
res.status(200).json({
    _id:user._id,
    isAdmin:user.isAdmin,
    token
})

})


/**-----------------------------------------------
 * @desc    Verify User Account
 * @route   /api/auth/:userId/verify/:token
 * @method  GET
 * @access  public
 ------------------------------------------------*/
 module.exports.verifyUserAccountCtrl = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(400).json({ message: "invalid link" });
    }
  
    const verificationToken = await VerificationToken.findOne({
      userId:user._id,
      token:req.params.token,
    });
  
    if (!verificationToken) {
      return res.status(400).json({ message: "invalid link" });
    }
  
    user.isAccountVerified = true;
    await user.save();
  
    // await verificationToken.remove();

    res.status(200).json({ message: "Your account verified" });
  });
  