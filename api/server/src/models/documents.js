module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    document: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.ENUM,
      values: ['commercial_invoice','packaging_list','cmr','export_declaration','bijak_file','others'],
      defaultValue:'commercial_invoice',
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
  return Documents;
};