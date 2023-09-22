const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./data/mongooseConfig.js");
const authRouter = require("./routes/auth.js");
const postRouter = require("./routes/post.js");
const PORT = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
