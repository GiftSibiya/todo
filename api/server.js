// Importing Dependencies
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Schema = mongoose.Schema;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Schema and Model //
const TaskerSchema = new Schema({
  title: String,
  bodyText: String,
});

const Tasker = mongoose.model("tasker", TaskerSchema);
//--//

/// Connect to database ///
async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to mongo");
  } catch (err) {
    console.error(err);
  }
}
connectToDb();

//--//

/// Routes ///
// creating

app.post("/create", async (req, res) => {
  //req
  console.log("Request Body:", req.body);
  const newTaskTitle = req.body.taskTitle;
  const newTaskBody = req.body.taskBody;
  console.log(newTaskTitle);
  try {
    const createdTask = await Tasker.create({
      title: newTaskTitle,
      bodyText: newTaskBody,
    });
    //res
    res.json(createdTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Reading

app.get("/", async (req, res) => {
  const allTasks = await Tasker.find();
  res.json(allTasks);
});

// Destroying //
app.delete("/delete/:taskId", async (req, res) => {
  const taskId = req.params.taskId;

  try {
    // Find the task by ID and delete it
    const findAndKill = await Tasker.findByIdAndDelete(taskId);

    if (!findAndKill) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Updating
app.put("/update/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const updatedTaskTitle = req.body.taskTitle;
  const updatedTaskBody = req.body.taskBody;

  try {
    // Find the task by ID and update its properties
    const updatedTask = await Tasker.findByIdAndUpdate(
      taskId,
      { title: updatedTaskTitle, bodyText: updatedTaskBody },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});
