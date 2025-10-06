const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    stored_name: {
      type: String,
      required: true,
    },
    original_name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Files = mongoose.model("files", FileSchema);
module.exports = Files;
