const User = require('../models/user');
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    document: {
      allowNull: false,
      type: DataTypes.STRING
    },
    truck_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['commercial_invoice','packaging_list','cmr','export_declaration','bijak_file','others','truck'],
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
  return Document;
};