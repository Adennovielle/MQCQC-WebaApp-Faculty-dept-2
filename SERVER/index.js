const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

//---------------DATABASE CONNECTION------------------
mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@mqc-app-test.v70deil.mongodb.net/mqcdb?retryWrites=true&w=majority&appName=mqc-app-test`
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

const userRoute = require("./Routes/Users");
app.use("/user", userRoute);

const fileRoute = require("./Routes/File");
app.use("/files", fileRoute);

app.listen(3001, () => {
  console.log("🚀 Server listening on port 3001");
});
console.log("👀 Server is running...");
