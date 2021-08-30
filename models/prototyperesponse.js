'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PrototypeResponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PrototypeResponse.init({
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    prototypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    linkToFile: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    answer : {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'PrototypeResponse',
  });
  PrototypeResponse.associate = function (models) {
    PrototypeResponse.belongsTo(models.ProductReview, {
      foreignKey: "reviewId",
      as: "ProductReview",
    });
    PrototypeResponse.belongsTo(models.Prototype, {
      foreignKey: "prototypeId",
      as: "Prototype",
    });
  };
  return PrototypeResponse;
};
