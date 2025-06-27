module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    skillsRequired: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    postedBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'filled'),
      defaultValue: 'active',
      allowNull: false
    }
  }, {
    tableName: 'jobs'
  });

  // Association setup
  Job.associate = function(models) {
    Job.belongsTo(models.User, {
      foreignKey: 'postedBy',
      as: 'admin'
    });

    Job.hasMany(models.Application, {
      foreignKey: 'job_id',
      as: 'applications'
    });
  };

  // Instance method
  Job.prototype.getApplicationsWithUsers = async function() {
    return await this.getApplications({
      include: [{
        model: sequelize.models.User,
        as: 'applicant'
      }]
    });
  };

  return Job;
};
