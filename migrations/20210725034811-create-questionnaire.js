'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Questionnaires", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "NewProducts",
          key: "id",
        },
      },
      questionStatement: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      questionType: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      optionA:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      optionB:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      optionC:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      optionD:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Questionnaires");
  },
};
