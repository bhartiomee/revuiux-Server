'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PotentialUserToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PotentialUserToken.init({
    key: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    potentialUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    expiryTime: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'PotentialUserToken',
    updatedAt: false,
  });
  PotentialUserToken.associate = function(models) {
    PotentialUserToken.belongsTo(models.PotentialUser, {foreignKey: 'potentialUserId', as: 'potentialUser'})
  };
  return PotentialUserToken;
};
