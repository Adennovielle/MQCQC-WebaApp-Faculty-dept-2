const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
// Connect to MongoDB

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@mqc-app-test.v70deil.mongodb.net/mqcdb?retryWrites=true&w=majority&appName=mqc-app-test`
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

const userRoute = require("./Routes/Users");
app.use("/user", userRoute);

app.listen(3001, () => {
  console.log("🚀 Server listening on port 3001");
});
