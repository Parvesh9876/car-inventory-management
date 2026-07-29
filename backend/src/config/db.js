const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(uri);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);

    throw error;
  }
};

module.exports = connectDB;