const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            min: 3,
            max: 20,
            unique: true,
        },
        email:{
            type:String,
            required : true,
            max: 40,
            unique: true,
        },
        password:{
            type:String,
            required: true,
            min: 6,
        },
        profilePicture:{
            type:String,
            default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        },
        coverPicture:{
            type:String,
            default:"https://i.pinimg.com/originals/42/30/ac/4230ace418b0836a3e6aec561bb0e4d8.jpg",
        },
        isAdmin:{
            type: Boolean,
            default:false,
        },
        followers:{
            type: Array,
            default: [],
        },
        followings:{
            type:Array,
            default:[],
        },
        desc:{
            type:String,
            max:60,
            default:"",
        },
        city:{
            type:String,
            max:15,
            default:"",
        },
        profession:{
            type:String,
            max:15,
            default:"",
        },
        favVehicle:{
            type: String,
            max: 15,
            default:"",
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);