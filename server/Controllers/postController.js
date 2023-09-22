const Post = require("../models/Post.js");
const postController = {
  // GET
  // get all post
  getPost: async (req, res) => {
    const userId = req.user.userId;
    try {
      const posts = await Post.find({ user: userId }).populate("user", [
        "username",
      ]);
      res.json({ success: true, message: "Post already get", posts });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST
  // created post
  createPost: async (req, res) => {
    const userId = req.user.userId;
    const { title, description, url, status } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Titile is required" });
    }
    try {
      const newPost = new Post({
        title,
        description,
        url: url.startsWith("https://") ? url : `https://${url}`,
        status: status || "TO LEARN ",
        user: userId,
      });
      await newPost.save();
      res.json({ success: true, message: "Post already created", newPost });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // PUT
  // update post
  updatePost: async (req, res) => {
    const userId = req.user.userId;
    const { title, description, url, status } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Titile is required" });
    }
    try {
      let updatePostValue = {
        title,
        description: description || "",
        url: (url.startsWith("https://") ? url : `https://${url}`) || "",
        status: status || "TO LEARN",
      };
      updatePostCondition = { _id: req.params.id, user: userId };
      const updatePost = await Post.findOneAndUpdate(
        updatePostCondition,
        updatePostValue,
        { new: true }
      );
      if (!updatePost) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid post" });
      }
      res.json({
        success: true,
        message: "Post alredy updated successfully",
        updatePost,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // DELETE
  // DELELE POST
  deletePost: async (req, res) => {
    const userId = req.user.userId;
    try {
      deletePostCondition = { _id: req.params.id, user: userId };
      const deletePost = await Post.findOneAndDelete(deletePostCondition);
      if (!deletePost) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid post" });
      }
      res.json({
        success: true,
        message: "Post already deleted successfully",
        deletePost,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = postController;
