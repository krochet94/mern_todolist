const User = require('../models/user');
const Todos = require('../models/todos');
const connectDatabase = require('../config/database');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");

const UserId = new mongoose.Types.ObjectId();
const TodosId = new mongoose.Types.ObjectId();

// initial user data
const userData = {
  _id: UserId,
  username: 'testuser',
  password: 'testuser',
};

// initial todos data
const todosData = {
  _id: TodosId,
  userId: UserId,
  todos: [
    { id: uuidv4(), task: 'Code', completed: true },
    { id: uuidv4(), task: 'Eat', completed: false },
    { id: uuidv4(), task: 'Sleep', completed: false },
  ],
};

const seedData = async () => {
  try {
    await connectDatabase();
    await User.deleteMany({});
    await Todos.deleteMany({});
    await User.insertMany(userData);
    await Todos.insertMany(todosData);
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
}

seedData();