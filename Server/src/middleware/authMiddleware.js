const {verify_token} = require('../config/jwt')

const authMiddleware =(req,res,next)=>{
    const authheader = req.headers['authorization'];
    if(!authheader || !authheader.startsWith("Bearer ")){
       return res.status(401).json({error:"No Token Provided"})
    }
    const token = authheader.split(" ")[1];

    try{
        const decoded = verify_token(token);
        req.user=decoded;
        next()
    }catch(err){
        return res.status(401).json({error:"Invalid or expired token"})
    }
};

module.exports = {authMiddleware}
