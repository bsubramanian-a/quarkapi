module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    avatar: {
      allowNull: true,
      type: DataTypes.STRING
    },
    firstname: {
      allowNull: true,
      type: DataTypes.STRING
    },
    lastname: {
      allowNull: true,
      type: DataTypes.STRING
    },
    is_verified: {
      allowNull: true,
      type: DataTypes.BOOLEAN
    },
    user_type: {
      type: DataTypes.ENUM,
      values: ['driver','buyer','receiver','transportation_company'],
      defaultValue:'driver',
    },
    phone_number: {
      allowNull: true,
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
      singular: 'user',
      plural: 'users',
    }
  });
  User.hasMany(Address);
  User.hasMany(Booking);
  User.hasMany(Company);
  User.hasMany(Document);
  User.hasMany(Payment);
  return User;
};