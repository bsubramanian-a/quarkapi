module.exports = (sequelize, DataTypes) => {
  const Truck = sequelize.define('Address', {
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
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
  return Address;
};