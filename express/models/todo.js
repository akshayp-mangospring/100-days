const { DataTypes } = require('sequelize');
const User = require('./user')
const { mysqlConnection } = require('../database')

const Todo = mysqlConnection.define('Todo', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
  timestamps: true,
  tableName: 'todos'
});

module.exports = Todo
