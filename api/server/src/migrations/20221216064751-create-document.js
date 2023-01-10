module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      document: {
        allowNull: false,
        type: Sequelize.STRING
      },
      truck_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['commercial_invoice','packaging_list','cmr','export_declaration','bijak_file','others', 'truck'],
        defaultValue:'commercial_invoice',
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
    await queryInterface.dropTable('Documents');
  }
};