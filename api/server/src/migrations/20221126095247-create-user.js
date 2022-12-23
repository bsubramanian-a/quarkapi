module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      otp: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING
      },
      firstname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lastname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      is_verified: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      user_type: {
        type: Sequelize.ENUM,
        values: ['driver','supplier','receiver','transporter'],
        defaultValue:'driver',
      },
      phone_number: {
        allowNull: true,
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
  down: (queryInterface) => {
    return queryInterface.dropTable('Users');
  }
};