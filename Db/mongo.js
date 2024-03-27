const mongoose = require("mongoose");
require('dotenv').config();

const connectToDatabase = async () => {
  try {
    const dbURI = process.env.MONGODB_URI;
    mongoose.set('strictQuery', false);
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

module.exports = connectToDatabase;
