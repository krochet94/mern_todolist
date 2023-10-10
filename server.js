const express = require('express');
const connectDatabase = require('./lib/config/database');
const cors = require('cors');
const app = express();
const port = 4000;

const User = require('./lib/models/user');
const Todos = require('./lib/models/todos');
const convertCredential = require('./lib/utils/convertCredential');

app.use(cors());
app.use(express.json());

// Registration
app.post('/register', async (req, res) => { 
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();
    if (user) {
      res.status(400).send({ message: 'Username already exists' });
      return;
    }
    await User.create({ username, password });
    res.send({ message: 'Success.' });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    res.status(400).send({ message: 'User not found.' });
    return;
  }
  if (user?.password !== password) {
    res.status(400).send({ message: 'Wrong password.' });
    return;
  }
  res.send({ message: 'Login success.' });
});

// Saving Todos Data
app.post('/todos', async (req, res) => {
  const { username, password } = convertCredential(req.headers);
  const todosItems = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user?.password !== password) {
    res.status(403).send({ message: 'Invalid access.' });
    return;
  }
  const todos = await Todos.findOne({ userId: user._id }).exec();
  if (!todos) await Todos.create({ userId: user._id, todos: todosItems });
  else {
    todos.todos = todosItems;
    await todos.save();
  }
  res.json(todosItems);
});

// Getting Todos Data
app.get('/todos', async (req, res) => {
  const { username, password } = convertCredential(req.headers);
  const user = await User.findOne({ username }).exec();
  if (!user || user?.password !== password) {
    res.status(403).send({ message: 'Invalid access.' });
    return;
  }
  const todosObj = await Todos.findOne({ userId: user._id }).exec();
  res.json(todosObj?.todos || []);
});

// Edit Account Data
app.post('/account', async (req, res) => {
  const { username, password } = convertCredential(req.headers);
  const { username: newUsername, password: newPassword } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user?.password !== password) {
    res.status(403).send({ message: 'Invalid access.' });
    return;
  }
  if (username === newUsername && password === newPassword) {
    res.status(400).send({ message: 'No change.' });
    return;
  }
  if (username !== newUsername) {
    user.username = newUsername;
    await user.save();
  }
  if (password !== newPassword) {
    user.password = newPassword;
    await user.save();
  }
  res.json({newUsername, newPassword});
});

main().catch(err => console.log(err));

async function main() {
  await connectDatabase();
  app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`)
  })
}