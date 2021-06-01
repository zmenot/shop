const { sequelize } = require('../sequelize.db.config');
const DataTypes = require('sequelize');

const Order_product = sequelize.define('order_product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  count_product: { type: DataTypes.INTEGER, defaultValue: 1 },
});
module.exports = Order_product;
