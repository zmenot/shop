const { sequelize } = require('../sequelize.db.config');
const DataTypes = require('sequelize');

const Order = sequelize.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  date: { type: DataTypes.STRING },
  comments: { type: DataTypes.STRING, defaultValue: '' },
  isConfirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
  payment: { type: DataTypes.STRING },
});
module.exports = Order;
