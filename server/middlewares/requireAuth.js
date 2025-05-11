const jwt=require('jsonwebtoken');
require('dotenv').config();
// verify the token 
const requireAuth = async (req, res, next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'});
    }
    const token=authorization.split(' ')[1];
    // verify the token 
    try{
        const decoded=jwt.verify(token, process.env.SECRET);
        console.log("decoded token", decoded);
        req.user=decoded;
        next();
    }catch(err){
        res.status(401).json({message:err.message});
    }
};

module.exports=requireAuth;