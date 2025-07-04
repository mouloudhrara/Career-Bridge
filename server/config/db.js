const Sequelize = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql', // tells sequelize which database engine you're using
        logging: false, // keeps your console clean by hiding raw SQL logs
    }
);

// Test the connection
sequelize.authenticate()
    .then(() => console.log('Database connection established successfully'))
    .catch(err => console.error('Unable to connect to the database:', err));

// Sync the database to ensure tables are created or updated
sequelize.sync({ alter: true }) // Changed 'alert' to 'alter'
    .then(() => console.log('Database synced successfully'))
    .catch(err => console.log('Error syncing database:', err));

// Export the instance for use in other files
module.exports = sequelize;