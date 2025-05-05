const {User} = require('../models/User');
const jwt= require('jsonwebtoken');
const crypto= require('crypto');
const nodemailer= require('nodemailer');
require('dotenv').config();

const createToken= (id)=>{
    return jwt.sign({id},process.env.SECRET,{expiresIn: '2d'});
};
// Signup user
const registerUser= async (req, res)=>{
    const {firstName, lastName, email, password} = req.body;
    try{
        const user= await User.signup(firstName, lastName, email, password);
        const token= createToken(user.id);
        return res.status(201).json({email:user.email, token});
    }catch(err){
        return res.status(400).json({message: err.message});
    }
}
// Login user
const loginUser= async (req, res)=>{
    const {firstName, lastName, email, password} = req.body;
    try{
        const user= await User.login(email, password);
        const token= createToken(user.id);
        return res.status(201).json({email:user.email, token});
    }catch(err){
        return res.status(400).json({message:err.message});
    }
};

// ForgotPassword
const forgotPassword = async (req, res)=>{
    const {email} = req.body;
    // check if user exists
    const user = await User.findOne({where: {email}});
    if(!user){
        return res.status(404).json({message: 'User not found with this email'});
    }
    // generate a secure token
    const token= crypto.randomBytes(32).toString('hex');
    const resetTokenExpires= Date.now() +1000 * 60 *15; //token expires in 15min
    // update user with reset token and exp
    user.resetToken=token;
    user.resetTokenExpires=resetTokenExpires;

    await user.save(); //writes the updated fields to the DB

    // Send email with reset link
    const  transporter= nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:process.env.EMAIL_USER, //your email
            pass: process.env.EMAIL_PASS,
        },
    });
    //User submits their email on the "Forgot Password" form.
    // checks if the email exists
    // creates a reset token
    // and sends a reset URL like this:
    const resetUrl=`http://localhost:3000/reset-password/${token}`;
}


module.exports={registerUser,loginUser};