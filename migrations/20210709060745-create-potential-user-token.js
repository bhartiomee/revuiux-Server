'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PotentialUserTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      key: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true
      },
      potentialUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'PotentialUsers',
          key: 'id'
        }
      },
      expiryTime: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PotentialUserTokens');
  }
};
