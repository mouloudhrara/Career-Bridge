const Sequelize= require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance using environment variables
const sequelize= new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect:'mysql',  //  tells sequelize which database engine you're using, it supports: postgres, sqlite... 
        logging: false, // keeps your console clean by hiding raw SQL logs
    }
);

// Export the instance for use in other files
module.exports=sequelize;