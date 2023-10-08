const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const app = express();
const port = 4000

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

const User = mongoose.model('User', userSchema);

const todosSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  todos: [
    {
      task: String,
      completed: Boolean,
      id: String
    }
  ]
});

const Todos = mongoose.model('Todos', todosSchema);

dotenv.config({ path: '.env'});
app.use(cors());
app.use(express.json());

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

app.post('/todos', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [username, password] = token.split(':');
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

app.get('/todos', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [username, password] = token.split(':');
  const user = await User.findOne({ username }).exec();
  if (!user || user?.password !== password) {
    res.status(403).send({ message: 'Invalid access.' });
    return;
  }
  const todosObj = await Todos.findOne({ userId: user._id }).exec();
  res.json(todosObj?.todos || []);
});

main().catch(err => console.log(err));

async function main() {
  let nodeConfig = false;
  if ((process.env.NODE_ENV || "").trim() === "PRODUCTION") nodeConfig = true;
  await mongoose.connect(`${nodeConfig ? process.env.DB_URI : process.env.DB_LOCAL_URI}`);
  console.log(`Connected to database: ${nodeConfig ? process.env.DB_URI : process.env.DB_LOCAL_URI}`);
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`)
    })

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}