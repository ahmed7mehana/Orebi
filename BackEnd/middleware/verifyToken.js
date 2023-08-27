const jwt = require("jsonwebtoken")

// is user admin ?
function verifyToken(req,res,next){

const auth=req.headers.authorization

if(auth){

const token = auth.split(" ")[1]

try {

    const decodeed=jwt.verify(token,process.env.JWT_SECRET)
    req.user=decodeed
    next()

} catch (error) {

    
    return res.status(401).json({message:"invalid token"})
}

}else{

    return res.status(401).json({message:"token needed"})

}

}


// admin

function TAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
    return res.status(403).json({message:"only admin"})
    
        }
    })
}
module.exports={
    verifyToken,
    TAdmin
}