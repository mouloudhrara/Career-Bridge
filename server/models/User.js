const {DataTypes, where} = require('sequelize');
const sequelize=require('../config/db');
const bcrypt= require('bcryptjs');
const validator=require('validator');

const User= sequelize.define('User', {
    id:{
        type: DataTypes.UUID, // Universally Unique Identifier
        defaultValue: DataTypes.UUIDV4, 
        primaryKey:true,
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    role:{
        type: DataTypes.STRING,
        defaultValue:'user',
        validate:{
            isIn:[['user','admin']]
        }
    }, //to add forget password feature
    resetToken:{
        type: DataTypes.STRING,
        allowNull:true
    },
    resetTokenExpires:{
        type:DataTypes.DATE,
        allowNull:true,
    }

},{
    tableName: 'users' // specifies the name of the database table that this model will map to
});

// Static Signup Method
User.signup = async function (firstName, lastName, email, password) {
    if (!firstName || !lastName || !email || !password) {
        throw Error('All fields must be filled');
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    // Check if the email already exists
    const existingUser = await this.findOne({ where: { email } });
    if (existingUser) {
        throw Error('Email already in use');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and return the new user
    const user = await this.create({ firstName, lastName, email, password: hashedPassword });
    return user;
};

// Static Login Method
User.login= async function (email, password) {
    if(!email || !password){
        throw Error('All fields must be filled');
    }
    // Find the user 
    const user= await this.findOne({where: {email}});
    if(!user){
        throw Error('Incorrect email');
    }
    // Compare passwords
    const match= await bcrypt.compare(password, user.password);
    if(!match){
        throw Error('Incorrect password');
    }
    return user;
}

module.exports={User};