const mongoose = require("mongoose");
require("dotenv").config();
const URL_MONGODB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@trangiabao.uzi4jp5.mongodb.net/?retryWrites=true&w=majority`;
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(URL_MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
