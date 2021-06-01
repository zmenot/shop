const { sequelize } = require('../sequelize.db.config');
const DataTypes = require('sequelize');

const Basket_product = sequelize.define('basket_product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  count_product: { type: DataTypes.INTEGER, defaultValue: 1 },
});
module.exports = Basket_product;
