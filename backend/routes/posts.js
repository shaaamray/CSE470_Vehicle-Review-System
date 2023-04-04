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

//like & dislike post

router.put("/:id/like", async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}})
            res.status(200).json("liked the post")
        }else{
            await post.updateOne({$pull: {likes:req.body.userId}})
            res.status(200).json("disliked the post")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

// write a review

router.put("/review", async(req, res) => {
    try{
        const{review, userImg, postid, userName, rating} = req.body
        const post = await Post.findById(postid);
        //check if the user has already reviewed
        const userHasReviewed = post.reviews.some(review => review.userName === userName)
        
        if (userHasReviewed) {
            return res.status(400).json({msg: "You have already reviewed this post."})
        }
        const reviews = {
            postid: postid,
            userName: userName,
            review: review,
            userImg: userImg,
            rating: rating,
        };
        
        post.reviews.push(reviews)
        console.log(post.reviews)
        await post.save();
        res.status(200).json(post);
    }catch(err){
        res.status(500).json({msg: err.message})
    }
})

//get average rating

router.get("/rating/:postid", async(req, res) => {
    try{
        const post = await Post.findById(req.params.postid);
        const reviews = post.reviews;
        const numReviews = reviews.length;
        let totalRating = 0;
        for(let i = 0; i<numReviews; i++) {
            totalRating += reviews[i].rating;
        }
        const averageRating = totalRating / numReviews;
        post.averageRating = averageRating;
        await post.save();
        res.status(200).json(post);
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router;