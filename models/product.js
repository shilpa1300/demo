module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    }, 
    productName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING
    },
    price: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      },
      allowNull: true
    },
    categoryId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'categories',
        key: 'id'
      },
      allowNull: true
    },
    
    
  });

  
  Product.associate = function(models) {
    Product.hasOne(models.categories, {
      foreignKey: 'id',
      sourceKey: 'categoryId',
      as: 'categories'
    });
    
    
  };
  return Product;
};


