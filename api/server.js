const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { addListener } = require("nodemon");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/mern-tasker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch(console.error);

app.listen(3001, () => console.log("listening on 3001"));
