"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("NewProducts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      goal: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      skills: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      projectTags: {
        type: Sequelize.STRING,
      },
      noOfReviewRequired: {
        type: Sequelize.INTEGER,
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      experience: {
        type: Sequelize.INTEGER,

      },
      industry: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jobFunction: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "PotentialUsers",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("NewProducts");
  },
};
