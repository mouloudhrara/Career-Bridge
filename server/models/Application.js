const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

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
            model: 'jobs', // Reference to Jobs table
            key: 'id'
        },
        onDelete: 'CASCADE' // Delete applications if job is deleted
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users', // Reference to Users table
            key: 'id'
        }
    },
    applicant_first_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    applicant_last_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    applicant_email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail:true
        }
    },
    applicant_phone:{
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
            is: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im // Basic phone regex
        }
    },
    cv_path: {
        type: DataTypes.STRING(512), // More appropriate length for paths
        allowNull: false,
        validate: {
            isUrl: true // Or custom validator for file paths
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
        type: DataTypes.DATE, // DATE is more standard than TIME
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    cover_letter_path: { // New field
        type: DataTypes.STRING(512),
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    application_source: { // New field
        type: DataTypes.STRING(100),
        defaultValue: 'career_bridge', // 'linkedin', 'company_site', etc.
        allowNull: false
    }
}, {
    tableName: 'applications',
    timestamps: true, // Adds createdAt and updatedAt
    indexes: [
        // For faster queries
        {
            fields: ['job_id']
        },
        {
            fields: ['user_id']
        },
        {
            fields: ['status']
        },
        // Composite index for common query patterns
        {
            fields: ['user_id', 'status']
        }
    ],
    hooks: {
    beforeCreate: async (application) => {
        // Auto-populate user data if not provided
        if (!application.applicant_email || !application.applicant_first_name) {
            const user = await sequelize.models.User.findByPk(application.user_id);
            if (user) {
                application.applicant_first_name = user.firstName;
                application.applicant_last_name = user.lastName;
                application.applicant_email = user.email;
                application.applicant_phone = user.phone;
            }
        }
        // Existing cv_path formatting
        if (application.cv_path && !application.cv_path.startsWith('http') && !application.cv_path.startsWith('/')) {
            application.cv_path = `/uploads/${application.cv_path}`;
        }
    }
}
});

Application.associate = function(models) {
  // An Application belongs to a User
  Application.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'applicant'
  });
  
  // An Application belongs to a Job
  Application.belongsTo(models.Job, {
    foreignKey: 'job_id',
    as: 'job'
  });
};

// helper methods
Application.prototype.getApplicantInfo = async function() {
  return await this.getApplicant();
};

Application.prototype.getJobInfo = async function() {
  return await this.getJob();
};

module.exports = Application;