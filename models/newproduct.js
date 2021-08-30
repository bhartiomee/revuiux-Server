"use strict";
const { Model } = require("sequelize");
const { PARTICIPANT, RESEARCHER } = require("../constants/modelConstants");
const {
  experience_options,
  industry,
  job_function,
} = require("../constants/modelConstantsMapping");

module.exports = (sequelize, DataTypes) => {
  class NewProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NewProduct.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [4, 30],
          is: "^[a-zA-Z][a-zA-Z ]*$",
        },
      },
      goal: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      skills: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
      projectTags: {
        type: DataTypes.STRING,
      },
      noOfReviewRequired: {
        type: DataTypes.INTEGER,
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [
            Object.keys(experience_options).map((option) => parseInt(option)),
          ],
        },
      },
      industry: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [Object.keys(industry).map((option) => parseInt(option))],
        },
      },
      jobFunction: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [Object.keys(job_function).map((option) => parseInt(option))],
        },
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "NewProduct",
      updatedAt: true,
    }
  );
  NewProduct.associate = function (models) {
    NewProduct.belongsTo(models.PotentialUser, {
      foreignKey: "createdBy",
      as: "potentialUser",
    });
  };
  return NewProduct;
};
