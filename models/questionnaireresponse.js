'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionnaireResponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  QuestionnaireResponse.init({
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'QuestionnaireResponse',
  });
  QuestionnaireResponse.associate = function (models) {
    QuestionnaireResponse.belongsTo(models.ProductReview, {
      foreignKey: "reviewId",
      as: "ProductReview",
    });
    QuestionnaireResponse.belongsTo(models.Questionnaire, {
      foreignKey: "questionId",
      as: "Questionnaire",
    });
  };
  return QuestionnaireResponse;
};
