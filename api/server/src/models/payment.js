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
          tableName: 'User'
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
  Payment.belongsToMany(User, {
    as: {
      singular: 'user',
      plural: 'users'
    }
  })
  return Payment;
};