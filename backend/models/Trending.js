const mongoose = require("mongoose");

const TrendingSchema = new mongoose.Schema(
    {
        url:{
            type: String,
            default:"",
        },
        webName:{
            type:String,
            default:""
        },
        homeImg:{
            type:String,
            default:""
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Trending", TrendingSchema);