const User = require("../models/User.js");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const authController = {
  // GET /
  checkUserLogin: async (req, res) => {
    try {
      const id = req.user.userId;

      const user = await User.findById(id).select("-password");
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      res.json({ success: true, user });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  // POST api/auth/register
  // Register
  registerUser: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter a username or password.",
      });
    }
    try {
      const user = await User.findOne({ username });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      // creat a new user
      const newUser = await new User({
        username: username,
        password: hashed,
      });
      //save to Database
      const newUserSave = await newUser.save();
      // return Token
      const accessToken = jwt.sign(
        { userId: newUserSave._id },
        process.env.ACCESTOKEN_SECRET
      );
      res.status(200).json({
        success: true,
        message: "User already created",
        accessToken,
        newUserSave,
      });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Wrong Username" });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res
          .status(404)
          .json({ success: false, message: "Wrong Password" });
      }
      // return Token

      if (user && validPassword) {
        const { password, ...others } = user._doc;
        const accessToken = jwt.sign(
          { userId: user._id },
          process.env.ACCESTOKEN_SECRET,
          { expiresIn: "2h" }
        );
        const refreshToken = jwt.sign(
          { userId: user._id },
          process.env.REFRESHTOKEN_SECRET,
          { expiresIn: "365d" }
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          path: "/",
          sameSite: "strict",
        });
        return res.status(200).json({
          success: true,
          message: "Login Success",
          ...others,
          accessToken: accessToken,
        });
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },
};

module.exports = authController;
