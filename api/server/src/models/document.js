const User = require('../models/user');
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    document: {
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
  Document.associate = function(models) {
    Document.belongsTo(models.User, {
      as: {
        singular: 'user',
        plural: 'users'
      }
    });
  };
  return Document;
};