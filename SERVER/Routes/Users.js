const express = require("express");
const router = express.Router();
const UsersModel = require("../Models/Users");

// Test GET route
router.get("/", async (req, res) => {
  const result = await UsersModel.find();
  res.json(result);
});

// Create new user
router.post("/create", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Create a new user instance
    const newUser = new UsersModel({ username, password });

    // Save to database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error });
  }
});

module.exports = router;
