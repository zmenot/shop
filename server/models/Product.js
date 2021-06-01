const { sequelize } = require('../sequelize.db.config');
const DataTypes = require('sequelize');

const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT },
  price_stock: { type: DataTypes.FLOAT, defaultValue: 0 },
  img: { type: DataTypes.STRING },
});

module.exports = Product;
