const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            require: true,
        },
        desc:{
            type: String,
            max: 300,
        },
        img:{
            type:String,
            default:"",           
        },
        likes:{
            type:Array,
            default:[],
        },
        reviews:[
            {
                user:{
                    type: mongoose.Schema.ObjectId,
                    required: true,
                },
                userImg:{
                    type:String,
                    required: true,
                },
                userName:{
                    type: String,
                    required: true,
                },
                review:{
                    type: String,
                    required:true,
                    max: 50,
                },
            },
        ],
    },
    {timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);