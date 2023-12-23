// Importing dependancies:
const express = require("express");

// Create our express application
const app = express();

// Routing, runs everytime someone hits this directory
app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

// Start our server:
app.listen(3001, () => console.log("listening on 3001"));
