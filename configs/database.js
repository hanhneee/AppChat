const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //Ham doi ket noi den Database
    await mongoose.connect("mongodb://127.0.0.1:27017/demo_app_chat");
    console.log("Connect Database Success");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
