const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//for writing api of image upload

router.put("/update/profilePicture/:id", async(req, res)=>{
    try{
        let user = await User.findById(req.params.id)
        if(user){
            user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            let updateUser = await user.save()
            res.status(200).json(updateUser)
        }else{
            res.status(403).json("user does not exist")
        }
    }catch(err){
        console.log(err)
        res.status(403).json("upload failed")
    }
})

router.put("/post/imageUpload/:id", async(req, res) => {
    try{
        let post = await Post.findById(req.params.id);
        if(post){
            post = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            let updatePost = await post.save()
            res.status(200).json(updatePost)
        }else{
            res.status(403).json("post does not exist");
        }
    }catch(err){
        res.status(403).json("post image upload failed")
    }
})

module.exports = router;