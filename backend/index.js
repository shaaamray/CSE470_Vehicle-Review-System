const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile")
const postRoute = require("./routes/posts")
const trendingRoute = require("./routes/trending")
const cors = require("cors");
// const multer = require("multer");
// const path = require("path");

dotenv.config();

mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("Connected to MongoDB")
    }
);

// mongoose.set('strictQuery', false);

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// app.use("/images", express.static(path.join(__dirname, "public/images")));

// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, "public/images");
//     },
//     filename: (req, file, cb) =>{
//         cb(null, req.body.name);
//     },
// })

// const upload = multer({storage: storage})
// app.post("/api/upload", upload.single("file"), (req, res)=>{
//     try{
//         return res.status(200).json("File uploaded")
//     }catch(error){
//         console.error(error);
//     }
// })

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute)
app.use("/api/posts", postRoute)
app.use("/api/trendings", trendingRoute)


app.listen(8800,()=>{
    console.log("Backend server is running")
});