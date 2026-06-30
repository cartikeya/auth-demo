// const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3000;
app.use(express.json());
const User = require("./models/User");
mongoose
  .connect("mongodb://localhost:27017/auth-demo")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  console.log(user);
  res.send("User registered");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).send("incorrect password");
  }
  return res.send("user logged in");
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));
