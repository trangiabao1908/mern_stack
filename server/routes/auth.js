const express = require("express");
const authController = require("../Controllers/authControllers.js");
const router = express.Router();
const middlewareController = require("../Controllers/middlewareController.js");

router.get(
  "/",
  middlewareController.verifyToken,
  authController.checkUserLogin
);
// POST api/auth/register
// Register
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
module.exports = router;
