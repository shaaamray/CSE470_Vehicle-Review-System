const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//get user profile
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { email, password, createdAt, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update user profile
router.put("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      let upuser = await user.save();
      res.status(200).json(upuser);
    } else {
      res.status(400).json("User do not exist");
    }
  } catch (err) {
    res.status(403).json(err);
  }
});

//delete user profile
router.delete("/:id", async (req, res) => {
  if (req.body.userID === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("This is not your account");
  }
});

//get user details
router.get("/get/userDetails/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(403).json("User does not exist");
    }
  } catch (err) {
    res.status(403).json("User does not exist");
  }
});

//get connections/friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const connections = await Promise.all(
      user.followings.map((connectionId) => {
        return User.findById(connectionId);
      })
    );

    let connectionList = [];
    connections.map((connection) => {
      const { _id, username, profilePicture } = connection;
      connectionList.push({ _id, username, profilePicture });
    });
    res.status(200).json(connectionList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId != req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("User is already followed");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can not follow yourself");
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId != req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("User is already unfollowed");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can not unfollow yourself");
  }
});

// get unknown connections

router.get("/unknown/con/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const followings = currentUser.followings;
    const newCon = await User.find({
      $and: [{ _id: { $ne: currentUser._id } }, { _id: { $nin: followings } }],
    });

    res.status(200).json(newCon);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
