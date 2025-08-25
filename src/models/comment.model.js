const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  musicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "music",
    required: true,
    index: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 2000,
  },
}, { timestamps: true });

module.exports = mongoose.model("comment", commentSchema);
