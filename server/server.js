const express=require("express");
const sequelize=require('./config/db.js');
require('dotenv').config();
const PORT=process.env.PORT;
const userRoutes=require('./routes/userRoutes');

const app=express();


// Middleware to parse JSON request bodies
app.use(express.json());

app.use('/api/users', userRoutes);


app.listen(PORT, ()=>{
    console.log("listening on port", PORT);
}); 

// testing connection to  the database
(async () =>{
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch(error){
        console.error('Unable to connect to the database:', error);
    }
})();