const {DataTypes} = require('sequelize');
const sequelize=require('../config/db');

const User= sequelize.define('User', {
    id:{
        type: DataTypes.UUID, // Universally Unique Identifier
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
    }
},{
    tableName: 'users' // specifies the name of the database table that this model will map to
});