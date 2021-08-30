'use strict';

const { Model } = require('sequelize');
const { experience_options, industry, job_function, highest_education, gender, potential_user_types } = require('../constants/modelConstantsMapping');
const { PARTICIPANT } = require('../constants/modelConstants');

module.exports = (sequelize, DataTypes) => {
  class PotentialUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PotentialUser.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [4, 30],
        is: "^[a-zA-Z][a-zA-Z ]*$"
      }
    },
    potential_user_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [Object.keys(potential_user_types).map(type => parseInt(type))],
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        is: "^[6-9][0-9]{9}$"
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        message: 'Email address already in use!'
      },
      validate: {
        isEmail: true
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        checkRequired(value) {
          if (this.potential_user_type === PARTICIPANT && !value) {
            throw new Error('Gender is required');
          }
        },
        isIn: [Object.keys(gender).map(option => parseInt(option))]
      }
    },
    socialMediaLink: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        checkRequired(value) {
          if (this.potential_user_type === PARTICIPANT && !value) {
            throw new Error('Experience is required');
          }
        },
        isIn: [Object.keys(experience_options).map(option => parseInt(option))],
      }
    },
    industry: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        checkRequired(value) {
          if (this.potential_user_type === PARTICIPANT && !value) {
            throw new Error('Industry is required');
          }
        },
        isIn: [Object.keys(industry).map(option => parseInt(option))],
      }
    },
    jobFunction: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        checkRequired(value) {
          if (this.potential_user_type === PARTICIPANT && !value) {
            throw new Error('Job function is required');
          }
        },
        isIn: [Object.keys(job_function).map(option => parseInt(option))],
      }
    },
    highestEducation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isIn: [Object.keys(highest_education).map(option => parseInt(option))],
      }
    },
    researchDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        checkRequired(value) {
          if (this.potential_user_type === PARTICIPANT && !value) {
            throw new Error('Skills is required');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'PotentialUser',
  });
  return PotentialUser;
};
