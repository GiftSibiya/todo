/// Importing the stuff ///

//mongoose
const mongoose = require("mongoose");
//env
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

/// ///

//make it async and add this code from the docs for mongoose. Get your connection string
async function connectToDb() {
  try {
    await mongoose.connect();
    console.log("Connected Successfully");
  } catch (err) {
    console.log(err);
  }
}

//Export it so we can use in other files
module.exports = connectToDb;
