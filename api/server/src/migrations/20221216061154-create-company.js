'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      reg_no: {
        allowNull: false,
        type: Sequelize.STRING
      },
      trucks_owned: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      trucks_partnership: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      latitude: {
        allowNull: true,
        type: Sequelize.REAL
      },
      longitude: {
        allowNull: true,
        type: Sequelize.REAL
      },
      md: {
        allowNull: false,
        type: Sequelize.STRING
      },
      md_phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      op: {
        allowNull: false,
        type: Sequelize.STRING
      },
      op_phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      overseas_agent: {
        allowNull: false,
        type: Sequelize.STRING
      },
      overseas_agent_phone: {
        allowNull: false,
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  }
};