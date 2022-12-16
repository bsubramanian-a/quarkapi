module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    reg_no: {
      allowNull: false,
      type: DataTypes.STRING
    },
    trucks_owned: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    trucks_partnership: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    phone_number: {
      allowNull: false,
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
    md: {
      allowNull: false,
      type: DataTypes.STRING
    },
    md_phone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    op: {
      allowNull: false,
      type: DataTypes.STRING
    },
    op_phone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    overseas_agent: {
      allowNull: false,
      type: DataTypes.STRING
    },
    overseas_agent_phone: {
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
  return Company;
};