'use strict';

const { question_types } = require("../constants/questionnareConstantsMapping");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Questionnaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Questionnaire.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      questionStatement: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      questionType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [Object.keys(question_types).map((type) => parseInt(type))],
        },
      },
      optionA: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      optionB: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      optionC: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      optionD: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Questionnaire",
    }
  );
  Questionnaire.associate = function (models) {
    Questionnaire.belongsTo(models.NewProduct, {
      foreignKey: "productId",
      as: "newProduct",
    });
  };
  return Questionnaire;
};
