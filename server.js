// const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const PORT = 3000;
app.use(express.json());
const User = require("./models/User");
const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/login", (req, res) => {
  res.send("login page");
  console.log();
});

app.get("/profile", authMiddleware, async (req, res) => {
  
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));
