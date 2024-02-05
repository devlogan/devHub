const mongoose = require("mongoose");

const connectDB = async (mongoURI) => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to DB!");
  } catch (err) {
    // Correctly log the error message
    console.error("I am error msg", err.message);
    // Optionally, log the entire error object to see more details
    console.error(err);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
