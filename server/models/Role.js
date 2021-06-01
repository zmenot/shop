const { sequelize } = require('../sequelize.db.config');
const DataTypes = require('sequelize');

const Role = sequelize.define('role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});
module.exports =  Role ;
