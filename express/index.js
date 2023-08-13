const { mysqlConnection } = require('./database')
const models = require('./models')
const userModel = require('./models/user')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/signup', async ({ body: { user: {
  username,
  email,
  password
} } }, res) => {
  const newUser = userModel.build({
    username,
    email,
    password,
  })

  const savedUser = await newUser.save().then(() => {
    res.send(savedUser);
  }).catch((err) => {
    res.send({ err });
  });
})

app.post('/login', (req, res) => {
  res.send('Hello World!')
})

app.get('/todos', (req, res) => {
  res.send('Hello World!')
})

app.post('/todos', (req, res) => {
  res.send('Hello World!')
})

app.put('/todos', (req, res) => {
  res.send('Hello World!')
})

app.delete('/todos', (req, res) => {
  res.send('Hello World!')
})

app.put('/todos/:id/done', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, async () => {
  try {
    await mysqlConnection.authenticate().then(async () => {
      models.forEach((model) => {
        mysqlConnection.models[model] = model;
      })

      await mysqlConnection.sync({ logging: console.log, alter: true })
        .then(() => {
          console.log('Synchronising models successful');
        }).catch((err) => {
          console.log(err);
          process.exit();
        });
    }).catch(() => {
    });
    console.log('Connection with database has been established successfully.');
    console.log(`Example app listening on port ${port}`)
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})
