const validator=require('validator');
const bcrypt= require('bcryptjs');
const {User} = require('../models/User');
const { where } = require('sequelize');

const registerUser= async (req, res)=>{
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({message: 'All fields are required'});
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({message: 'Email is not valid'});
    }
    if(!validator.isStrongPassword(password)){
        return res.status(400).json({message:'Password not strong enough'});
    }

    // Check if email already exists in the database
    const userExists= await User.findOne({where : {email}});

    if(userExists){
        return res.status(400).json({message: 'Email already exists'});
    }
}