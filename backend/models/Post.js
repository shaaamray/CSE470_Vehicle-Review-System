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
        category:{
            type:String,
            required: true,
        },
        reviews:[
            {
                postid:{
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
                rating:{
                    type: Number,
                    required: true,
                }
            },
        ],
        averageRating:{
            type: Number,
            default: 0,
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);