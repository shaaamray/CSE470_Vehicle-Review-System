import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { profUpdateAction, getUserAction } from "../../redux/api";
import axios from "axios";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../upload";
import { async } from "@firebase/util";

export default function Profile() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.user);
  const user = data.user;
  console.log(user);

  const [file, setFile] = useState(null);
  console.log(file, 1);

  const submitHandler = async (e) => {
    
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
          fetch(`http://localhost:8800/api/profile/update/profilePicture/${user._id}`, {
            method: "PUT",
            headers: {"Content-Type":"application/JSON"},
            body: JSON.stringify({profilePicture: downloadURL})
          })

        });
      }
    );
  };

  const refreshHandler= (e) =>{
    e.preventDefault()
    getUserAction(dispatch, user._id)
  } 

  return (
    <>
      <Topbar />
      <div className="profPageContainer">
        <div className="profBox">
          <div className="profBoxWrapper">
            <div className="profBoxTop">
              <label htmlFor="file">
                <img
                  src={`${user.coverPicture}`}
                  alt=""
                  className="profCover"
                />
                <input
                  type="file"
                  id="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </label>
              <label>
                <img src={`${user.profilePicture}`} alt="" className="profDp" />
                <input
                  type="file"
                  id="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <div className="profInfo">
              <div className="profImg">
                <h4 className="profInfoName">{user.username}</h4>
                <button className="picUpButton" onClick={submitHandler}>
                  Change DP
                </button>
                <button className="picUpButton">Change Cover</button>
                <button className="picUpButton" onClick={refreshHandler}>
                  Refresh
                </button>
              </div>
              <div className="profEdit">
                <span className="profBio">{user.desc}</span>
                <Link
                  to={`/profUpdate/${user.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <EditIcon className="editIcon"></EditIcon>
                </Link>
              </div>
            </div>
            <div className="profDetails">
              <ul className="profDetailsList">
                <li className="profDetailsListItem">
                  <LocationCityIcon className="profDetailsIcon" />
                  <span className="profDetailsName">City: </span>
                  <span className="profDetailsInfo">{user.city}</span>
                </li>
                <li className="profDetailsListItem">
                  <WorkOutlineIcon className="profDetailsIcon" />
                  <span className="profDetailsName">Profession: </span>
                  <span className="profDetailsInfo">{user.profession}</span>
                </li>
                <li className="profDetailsListItem">
                  <TimeToLeaveIcon className="profDetailsIcon" />
                  <span className="profDetailsName">Favourite Vehicle: </span>
                  <span className="profDetailsInfo">{user.favVehicle}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="connectBox">
          <div className="connectBoxWrapper">

          </div>
        </div> */}
      </div>
    </>
  );
}
