module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    booking_no: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'User'
        },
        key: 'id'
      }
    },
    client_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    payment_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Payment'
        },
        key: 'id'
      }
    },
    client_phone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    no_of_trucks: {
      allowNull: false,
      type: DataTypes.STRING
    },
    client_address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    date_of_booking: {
      allowNull: false,
      type: DataTypes.DATE
    },
    commodity_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    package_type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    total_net_weight: {
      allowNull: false,
      type: DataTypes.REAL
    },
    truck_net_weight: {
      allowNull: false,
      type: DataTypes.REAL
    },
    cargo_hs_code: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    msds_file: {
      allowNull: false,
      type: DataTypes.STRING
    },
    loading_company_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    loading_company_rep: {
      allowNull: false,
      type: DataTypes.STRING
    },
    loading_company_clearance_agent: {
      allowNull: false,
      type: DataTypes.STRING
    },
    loading_hs_code: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    loading_address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    loading_zip: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    loading_phone_number: {
      allowNull: false,
      type: DataTypes.STRING
    },
    loading_date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    loading_lat: {
      allowNull: false,
      type: DataTypes.REAL
    },
    loading_lng: {
      allowNull: false,
      type: DataTypes.REAL
    },
    departure_company_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    departure_company_rep: {
      allowNull: false,
      type: DataTypes.STRING
    },
    departure_company_clearance_agent: {
      allowNull: false,
      type: DataTypes.STRING
    },
    departure_hs_code: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    departure_address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    departure_zip: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    departure_phone_number: {
      allowNull: false,
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pending','confirm','cancel','deliver'],
      defaultValue:'pending',
    },
    departure_lat: {
      allowNull: true,
      type: DataTypes.REAL
    },
    departure_lng: {
      allowNull: true,
      type: DataTypes.REAL
    },
  });
  Booking.belongsToMany(User, {
    as: {
      singular: 'user',
      plural: 'users'
    }
  })
  Booking.hasOne(Payment, {
    as: {
      singular: 'payment',
      plural: 'payments'
    }
  })
  return Booking;
};