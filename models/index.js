const config = require("../config/dbConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.js")(sequelize, Sequelize);
db.products = require('../models/product')(sequelize, Sequelize)
db.categories = require('../models/categorie')(sequelize, Sequelize)


db.categories.hasMany(db.products, { as: "products" });
db.products.belongsTo(db.categories, {
  foreignKey: "categoryId",
  as: "categories",
});



db.sequelize.sync()

module.exports = db;










