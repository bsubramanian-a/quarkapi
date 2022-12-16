module.exports = (sequelize, DataTypes) => {
  const Truck = sequelize.define('Truck', {    
    truck_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transit_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  return Truck;
};