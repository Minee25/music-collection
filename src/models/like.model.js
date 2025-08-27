const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  musicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "music",
    required: true,
    index: true
  },
  likeCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("like", likeSchema);