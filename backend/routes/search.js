const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { route } = require("./users");

// seearch a profile

router.get("/user/prof", async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const users = await User.find({
      username: { $regex: searchQuery, $options: "i" },
    });

    if (!users) {
      return res.status(400).json({ msg: "User not Found" });
    }

    res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// search a post

router.get("/user/post", async (req, res) => {
    try {
      const searchQuery = req.query.q;
      const post = await Post.find({
        desc: { $regex: searchQuery, $options: "i" },
      });
  
      if (!post) {
        return res.status(400).json({ msg: "Post not Found" });
      }
  
      res.status(200).json(post);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  });
  

module.exports = router;
