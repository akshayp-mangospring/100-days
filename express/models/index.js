const todo = require('./todo')
const user = require('./user')

// User has many Todos
user.hasMany(todo, {
  foreignKey: {
    name: 'user_id',
  }
});

// A Todo belongs to a User
todo.belongsTo(user, {
  foreignKey: {
    name: 'user_id',
  }
});

const models = [
  user,
  todo,
]

module.exports = models
