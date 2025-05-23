const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Job= sequelize.define('Job',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    title:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    description : {
        type:DataTypes.TEXT,
    },
    skillsRequired: {
        type:DataTypes.JSON,
        allowNull:false,
    },
    postedBy:{
        type:DataTypes.UUID,
        allowNull:false,
    },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'filled'),
        defaultValue: 'active',
        allowNull: false
    }
} , {
    tableName: 'jobs'
});

// custom method to declare relationships with other models
Job.associate = (models)=>{
    // job is posted by a user (admin)
    // each job belongs to one User
    Job.belongsTo(models.User, {
        // specifies which field in Job model is used to link to the User's id
        foreignKey: 'postedBy',
        as:'admin', //optional
    });
};

module.exports=Job;