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
Job.associate = function(models) {
  // A Job belongs to a User (poster/admin)
  Job.belongsTo(models.User, {
    foreignKey: 'postedBy',
    as: 'admin'
  });
  
  // A Job can have many Applications
  Job.hasMany(models.Application, {
    foreignKey: 'job_id',
    as: 'applications'
  });
};

Job.prototype.getApplicationsWithUsers = async function() {
  return await this.getApplications({
    include: [{
      model: sequelize.models.User,
      as: 'applicant'
    }]
  });
};

module.exports=Job;