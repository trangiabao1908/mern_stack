const express = require("express");
const router = express.Router();
const middlewareController = require("../Controllers/middlewareController.js");
const postController = require("../Controllers/postController.js");

router.get("/", middlewareController.verifyToken, postController.getPost);
router.post("/", middlewareController.verifyToken, postController.createPost);
router.put("/:id", middlewareController.verifyToken, postController.updatePost);
router.delete(
  "/:id",
  middlewareController.verifyToken,
  postController.deletePost
);
module.exports = router;
