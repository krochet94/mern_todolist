const mongoose = require("mongoose");

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

module.exports = mongoose.model('Todos', todosSchema);