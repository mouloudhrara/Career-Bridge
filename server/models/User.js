const bcrypt = require('bcryptjs');
const validator = require('validator');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      validate: {
        isIn: [['user', 'admin', 'job_poster']]
      }
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetTokenExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cvPath: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'users'
  });

  // Static Signup Method
  User.signup = async function(firstName, lastName, email, password, role, companyName, companyCode) {
    if (!firstName || !lastName || !email || !password) {
      throw Error('All fields must be filled');
    }

    if (!validator.isEmail(email)) {
      throw Error('Email is not valid');
    }

    if (!validator.isStrongPassword(password)) {
      throw Error('Password is not strong enough');
    }

    const existingUser = await this.findOne({ where: { email } });
    if (existingUser) {
      throw Error('Email already in use');
    }

    if (role === 'job_poster') {
      if (!companyCode || companyCode !== process.env.COMPANY_SECRET_CODE) {
        throw Error('Invalid company registration code');
      }
      if (!companyName) {
        throw Error('Company name is required for job posters');
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({ 
      firstName, 
      lastName, 
      email, 
      password: hashedPassword, 
      role,
      companyName: role === 'job_poster' ? companyName : null
    });
    return user;
  };

  // Static Login Method
  User.login = async function(email, password) {
    if (!email || !password) {
      throw Error('All fields must be filled');
    }

    const user = await this.findOne({ where: { email } });
    if (!user) {
      throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error('Incorrect password');
    }
    return user;
  }

  User.associate = function(models) {
    User.hasMany(models.Application, {
      foreignKey: 'user_id',
      as: 'applications'
    });
    
    User.hasMany(models.Job, {
      foreignKey: 'postedBy',
      as: 'postedJobs'
    });
  };

  // Instance method
  User.prototype.getApplicationsWithJobs = async function() {
    return await this.getApplications({
      include: [{
        model: this.sequelize.models.Job,
        as: 'job'
      }]
    });
  };

  return User;
};