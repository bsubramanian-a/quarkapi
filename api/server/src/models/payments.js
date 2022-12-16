module.exports = (sequelize, DataTypes) => {
  const Truck = sequelize.define('Payments', {
    type: {
      type: DataTypes.ENUM,
      values: ['cash','paypal','card'],
      defaultValue:'cash',
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pending','paid','failed'],
      defaultValue:'pending',
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
  return Payments;
};