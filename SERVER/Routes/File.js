const express = require("express");
const router = express.Router();
const FilesModel = require("../Models/File");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "../Uploads");
// ensure folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Create storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Rename file: current timestamp + original extension
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

// Initialize upload middleware
const upload = multer({ storage: storage });

router.post("/upload", upload.array("files"), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const filesToSave = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      const fileData = {
        stored_name: file.filename,
        original_name: file.originalname,
        owner: req.body.owner || "faculty",
      };

      console.log("📦 Saving file to DB:", fileData);

      const newFile = new FilesModel(fileData);
      const saved = await newFile.save();
      console.log("✅ Saved file:", saved);
      filesToSave.push(saved);
    }

    res.status(201).json({
      message: "Files uploaded successfully",
      files: filesToSave,
    });
  } catch (error) {
    console.error("❌ Error in /upload route:", error);
    res.status(500).json({
      message: "Error uploading files",
      error: error.message,
    });
  }
});
// GET all files
router.get("/", async (req, res) => {
  try {
    const result = await FilesModel.find();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching files", error: err });
  }
});

// GET BY SEARCH
router.get("/search", async (req, res) => {
  try {
    const searchInput = req.query.q?.trim() || "";

    if (!searchInput) {
      // If no search input, return all files
      const allFiles = await FilesModel.find().sort({ createdAt: -1 });
      return res.json(allFiles);
    }

    // Only include String fields
    const stringFields = Object.entries(FilesModel.schema.paths)
      .filter(([_, schemaType]) => schemaType.instance === "String")
      .map(([key]) => key);

    // Build regex search conditions for string fields only
    const orConditions = stringFields.map((field) => ({
      [field]: { $regex: searchInput, $options: "i" },
    }));

    const results = await FilesModel.find({ $or: orConditions }).sort({
      createdAt: -1,
    });

    res.json(results);
  } catch (error) {
    console.error("❌ Error fetching files:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
