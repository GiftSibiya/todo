// Importing the stuff here

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// //

//// Creating the Schema model: ////
const TaskerSchema = new Schema({
  title: String,
  bodyText: String,
});

// Compiling it into a model.
const Tasker = mongoose.model("Tasker", TaskerSchema);

/// Export the model
module.exports = Tasker;
