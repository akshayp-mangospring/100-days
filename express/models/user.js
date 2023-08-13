const { DataTypes } = require('sequelize');
const Todo = require('./todo')
const { mysqlConnection } = require('../database')

const User = mysqlConnection.define('User', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  timestamps: true,
  tableName: 'users'
});

module.exports = User
