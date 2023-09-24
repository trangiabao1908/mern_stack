const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: (req, res, next) => {
    const accessToken = req.header("Authorization");
    const token = accessToken && accessToken.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token not found" });
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESTOKEN_SECRET);
      req.user = decoded;
      console.log(req.user);
      next();
    } catch (err) {
      res.status(403).json({ success: false, message: "Invalid Token" });
    }
  },
};
module.exports = middlewareController;
