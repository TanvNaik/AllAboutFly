const express = require("express");

const app = express();

const port = 8000;

app.get("/", (req, res) => {
  return res.send("Home page");
});
app.get("/login", (req, res) => {
  return res.send("You are visiting a login route");
});
app.get("/signout", (req, res) => {
  return res.send("You are signed out");
});

app.get("/signup", (req, res) => {
  return res.send("this is signup page");
});
app.get("/hitesh", (req, res) => {
  return res.send("hey hitesh's instagram ");
});

app.listen(port, () => {
  console.log("Server is up and running...");
});
