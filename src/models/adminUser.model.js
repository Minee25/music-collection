const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("adminUser", adminUserSchema);