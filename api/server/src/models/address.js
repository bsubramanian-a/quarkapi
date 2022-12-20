module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      }
    },
    latitude: {
      allowNull: true,
      type: DataTypes.REAL
    },
    longitude: {
      allowNull: true,
      type: DataTypes.REAL
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING
    },
    zip: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });
  Address.associate = function(models) {
    Address.belongsTo(models.User, {
      as: {
        singular: 'user',
        plural: 'users'
      }
    });
  };
  return Address;
};