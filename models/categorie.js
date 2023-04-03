// module.exports = (sequelize, DataTypes) => {
module.exports = (sequelize, Sequelize) => {
  const Categories = sequelize.define('categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    }, 
    categoryName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    userId: {
     type: Sequelize.INTEGER,
     references: {
      model: 'user',
      key: 'id'
    },
    allowNull: true
  }
});

  Categories.associate = function(models) {
    Categories.belongsTo(models.product, {
      foreignKey: 'categoryId',
      as: 'product'
     });
     
  };

  return Categories;
};



