const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to Database ${mongoose.connection.host}`);
  } catch (err) {
    console.log(`DB ERROR`, err);
  }
}

module.exports = connectDB;