module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {    
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    avatar: {
      allowNull: true,
      type: DataTypes.STRING
    },
    firstname: {
      allowNull: true,
      type: DataTypes.STRING
    },
    lastname: {
      allowNull: true,
      type: DataTypes.STRING
    },
    is_verified: {
      allowNull: true,
      type: DataTypes.BOOLEAN
    },
    user_type: {
      type: DataTypes.ENUM,
      values: ['driver','buyer','receiver','transportation_company'],
      defaultValue:'driver',
    },
    phone_number: {
      allowNull: true,
      type: DataTypes.STRING
    },
    latitude: {
      allowNull: true,
      type: DataTypes.REAL
    },
    longitude: {
      allowNull: true,
      type: DataTypes.REAL
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    name: {
      singular: 'user',
      plural: 'users',
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Address, {
      as: {
        singular: 'address',
        plural: 'addresses'
      }
    });
    User.hasMany(models.Booking, {
      as: {
        singular: 'booking',
        plural: 'bookings'
      }
    });
    User.hasMany(models.Company, {
      as: {
        singular: 'company',
        plural: 'companies'
      }
    });
    User.hasMany(models.Document, {
      as: {
        singular: 'document',
        plural: 'documents'
      }
    });
    User.hasMany(models.Payment, {
      as: {
        singular: 'payment',
        plural: 'payments'
      }
    });
  };
  return User;
};