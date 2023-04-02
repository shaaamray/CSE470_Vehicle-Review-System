const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { route } = require("./users");

//create post

router.post("/", async(req, res) => {
    const createPost = new Post(req.body);
    try{
        const savePost = createPost.save()
        res.status(200).json(savePost)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;

//get a post

router.get("/:id", async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})

//get all posts

router.get("/homepage/:userId", async(req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: user._id});
        const friendPosts = await Promise.all(
            user.followings.map((friendId) => {
                return Post.find({userId: friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    }catch(err){
        res.status(500).json(err)
    }
})