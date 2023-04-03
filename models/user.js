module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,

    },
    password: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },

  });



  User.associate = function(models) {
    User.hasMany(models.product, {
      foreignKey: 'id',
      sourceKey: 'userId',
      as: 'product',
    });
  };

  return User;
};



