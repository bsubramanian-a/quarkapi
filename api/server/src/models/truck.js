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
    driver_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      allowNull: false,
      type: DataTypes.DATE
    },
    license_no: {
      type: DataTypes.STRING,
      allowNull: false
    },
    license_validity: {
      allowNull: false,
      type: DataTypes.DATE
    },
    id_no:{
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
  return Truck;
};