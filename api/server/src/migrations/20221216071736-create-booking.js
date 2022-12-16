module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      booking_no: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      client_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      payment_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      client_phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      no_of_trucks: {
        allowNull: false,
        type: Sequelize.STRING
      },
      client_address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date_of_booking: {
        allowNull: false,
        type: Sequelize.DATE
      },
      commodity_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      package_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      total_net_weight: {
        allowNull: false,
        type: Sequelize.REAL
      },
      truck_net_weight: {
        allowNull: false,
        type: Sequelize.REAL
      },
      cargo_hs_code: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      msds_file: {
        allowNull: false,
        type: Sequelize.STRING
      },
      loading_company_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      loading_company_rep: {
        allowNull: false,
        type: Sequelize.STRING
      },
      loading_company_clearance_agent: {
        allowNull: false,
        type: Sequelize.STRING
      },
      loading_hs_code: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      loading_address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      loading_zip: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      loading_phone_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      loading_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      loading_lat: {
        allowNull: false,
        type: Sequelize.REAL
      },
      loading_lng: {
        allowNull: false,
        type: Sequelize.REAL
      },
      departure_company_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      departure_company_rep: {
        allowNull: false,
        type: Sequelize.STRING
      },
      departure_company_clearance_agent: {
        allowNull: false,
        type: Sequelize.STRING
      },
      departure_hs_code: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      departure_address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      departure_zip: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      departure_phone_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM,
        values: ['pending','confirm','cancel','deliver'],
        defaultValue:'pending',
      },
      departure_lat: {
        allowNull: true,
        type: Sequelize.REAL
      },
      departure_lng: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};