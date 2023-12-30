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

app.post("/create", async (req, res) => {
  //req
  const newTaskTitle = req.body.title;
  const newTaskBody = req.body.bodyText;
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

app.get("/", async (req, res) => {
  const allTasks = await Tasker.find();
  res.json(allTasks);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});
