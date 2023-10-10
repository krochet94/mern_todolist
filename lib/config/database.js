const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config({ path: '.env'});

const connectDatabase = async () =>  {
  let nodeConfig = false;
  if ((process.env.NODE_ENV || "").trim() === "PRODUCTION") nodeConfig = true;
  await mongoose.connect(`${nodeConfig ? process.env.DB_URI : process.env.DB_LOCAL_URI}`);
  console.log(`Connected to database: ${nodeConfig ? process.env.DB_URI : process.env.DB_LOCAL_URI}`);
}

module.exports = connectDatabase;