'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PrototypeResponses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reviewId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "ProductReviews",
          key: "id",
        },
      },
      prototypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Prototypes",
          key: "id",
        },
      },
      linkToFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      answer: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PrototypeResponses');
  }
};
