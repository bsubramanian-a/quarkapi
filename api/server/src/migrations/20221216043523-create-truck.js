module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trucks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      truck_no: {
        type: Sequelize.STRING,
        allowNull: false
      },
      transit_no: {
        type: Sequelize.STRING,
        allowNull: false
      },
      driver_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dob: {
        allowNull: false,
        type: Sequelize.DATE
      },
      license_no: {
        type: Sequelize.STRING,
        allowNull: false
      },
      license_validity: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Trucks');
  }
};