// env Variables.
// we only want this to be in local. not in production.

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Importing dependancies:
const express = require("express");
const connectToDb = require("./connectToDb");

//// Create our express application ////
//create it
const app = express();

// make it read json
app.use(express.json());

// //

//Connect to database
connectToDb();

//// Routing, runs everytime someone hits this directory ////

// goint into the home page //
app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

// making an note, things get sent via a request
app.post("./tasks", (req, res) => {
  // get the sent data from the body
  const title = req.body.title;
  const bodyText = req.body.bodyText;

  //make a task to it

  //respond with the new task
});

// Start our server:
// The port is in our local enviroment folder
app.listen(process.env.PORT, () => console.log("listening on 3001"));
