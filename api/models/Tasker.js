const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskerSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: flase,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
});
const Tasker = require("./models/Tasker");

app.get("/tasker", async (req, res) => {
  const tasks = await Tasker.find();

  res.json(tasks);
});

const Tasker = mongoose.model("Tasker", TaskerSchema);

module.exports = Tasker;
