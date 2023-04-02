import "./makepost.css";

import PermMediaIcon from "@mui/icons-material/PermMedia";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../upload";

import { postUpdateAction } from "../../redux/api";

export default function Makepost() {
  const data = useSelector((state) => state.user);
  const user = data.user;
  console.log(user);

  const userId = user._id;
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  console.log(file, 3);

  const dispatch = useDispatch();

  const uploadHandler = (e) =>{
    e.preventDefault();
    postUpdateAction(dispatch, {desc, userId})
    console.log("Dispatched")
  }

  const imageHandler = (e) =>{
    e.preventDefault();
    const fname = new Date().getTime() + file.name

    const storage = getStorage(app);
    const storageRef = ref(storage, fname);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default :
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          fetch(`http://localhost:8800/api/posts`, {
            method: "POST",
            headers: {"Content-Type":"application/JSON"},
            body: JSON.stringify({desc:desc, userId: userId, img: downloadURL})
          })

        });
      }
    );
  }

  return (
    <div className="shareBox">
      <div className="shareBoxWrapper">
        <div className="shareTop">
          <img src={`${user.profilePicture}`} alt="" className="shareUserImg" />
          <input
            placeholder="Write a review on a Vehicle"
            className="shareDesc"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon className="shareIcon" />
              <span className="shareIconText">Select Photo</span>
              <input
                type="file"
                id="file"
                accept=".jpg, .png, .jpeg"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            {/* <button className="shareButton" onClick={uploadHandler}>Upload</button> */}
            <button className="shareButton" onClick={imageHandler}>Share Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}
