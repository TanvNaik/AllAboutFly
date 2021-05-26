const express = require("express");

const app = express();

const port = 8000;

const admin = (req, res) => {
  return res.send("admin dashboard");
};

const isAdmin = (req, res, next) => {
  console.log("isAdmin is running");
  next();
};
const isLoggedIn = (req, res, next) => {
  console.log("Logged In");
  next();
};

app.get("/", (req, res) => {
  return res.send("Home page");
});

app.get("/admin", isLoggedIn, isAdmin, admin);

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
