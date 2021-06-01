const { sequelize } = require('../sequelize.db.config');
const DataTypes = require('sequelize');

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING },
});
module.exports = Category;
