// const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
const User = require("./models/User");
let authCollection;
mongoose
  .connect("mongodb://localhost:27017/auth-demo")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  console.log(user);
  res.send("User registered");
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));
