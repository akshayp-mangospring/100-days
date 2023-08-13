const { Sequelize } = require('sequelize');

const mysqlConnection = new Sequelize('basic_todo_express', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = {
  mysqlConnection,
}
