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