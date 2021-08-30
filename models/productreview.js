'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class ProductReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProductReview.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    reviewCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'ProductReview',
  });
  ProductReview.associate = function(models) {
    ProductReview.belongsTo(models.PotentialUser, {foreignKey: 'userId', as: 'potentialUser'})
    ProductReview.belongsTo(models.NewProduct, {foreignKey: 'productId', as: 'newProduct'})
  };
  return ProductReview;
};
