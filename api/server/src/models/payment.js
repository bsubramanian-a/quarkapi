const User = require('../models/user');
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    type: {
      type: DataTypes.ENUM,
      values: ['cash','paypal','card'],
      defaultValue:'cash',
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
  }, {
    name: {
      singular: 'payment',
      plural: 'payments',
    }
  });
  Payment.associate = function(models) {
    Payment.belongsTo(models.User, {
      as: {
        singular: 'user',
        plural: 'users'
      }
    });
  };
  return Payment;
};