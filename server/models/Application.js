module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define("Application", {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
        },
        job_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'jobs',
            key: 'id'
        },
        onDelete: 'CASCADE'
        },
        user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
            }
        },
    applicant_first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    applicant_last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    applicant_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    applicant_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cv_path: {
      type: DataTypes.STRING(512),
      allowNull: false,
      validate: {
        notEmpty: true 
      }
    },
    status: {
      type: DataTypes.ENUM(
        'pending', 
        'under_review', 
        'shortlisted', 
        'interviewing',
        'offer_sent',
        'rejected',
        'withdrawn'
      ),
      defaultValue: 'pending',
      allowNull: false
    },
    applied_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cover_letter_path: {
      type: DataTypes.STRING(512),
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    application_source: {
      type: DataTypes.STRING(100),
      defaultValue: 'career_bridge',
      allowNull: false
    }
  }, {
    tableName: 'applications',
    timestamps: true,
    indexes: [
      {
        fields: ['job_id']
      },
      {
        fields: ['user_id']
      },
      {
        fields: ['status']
      },
      {
        fields: ['user_id', 'status']
      }
    ],
    hooks: {
      beforeCreate: async (application) => {
        if (!application.applicant_email || !application.applicant_first_name) {
          const user = await application.sequelize.models.User.findByPk(application.user_id);
          if (user) {
            application.applicant_first_name = user.firstName;
            application.applicant_last_name = user.lastName;
            application.applicant_email = user.email;
            application.applicant_phone = user.phone;
          }
        }
        if (application.cv_path && !application.cv_path.startsWith('http') && !application.cv_path.startsWith('/')) {
          application.cv_path = `/uploads/${application.cv_path}`;
        }
      }
    }
  });

  Application.associate = function(models) {
    Application.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'applicant'
    });
    
    Application.belongsTo(models.Job, {
      foreignKey: 'job_id',
      as: 'job'
    });
  };

  // Instance methods
  Application.prototype.getApplicantInfo = async function() {
    return await this.getApplicant();
  };

  Application.prototype.getJobInfo = async function() {
    return await this.getJob();
  };

  return Application;
};