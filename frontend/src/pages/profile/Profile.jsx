import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CameraIcon from "@mui/icons-material/Camera";
import EditIcon from "@mui/icons-material/Edit";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getUserAction } from "../../redux/api";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../upload";
// import { async } from "@firebase/util";

export default function Profile() {
  const dispatch = useDispatch();

  let location = useLocation();
  const data = useSelector((state) => state.user);
  const user = data.user;
  console.log(user);

  const [file, setFile] = useState(null);

  const [suser, setSuser] = useState({});
  const c = location.pathname.split("/")[2];
  console.log(c);

  const [cons, setCons] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const fname = new Date().getTime() + file.name;

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
          default:
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
          fetch(
            `http://localhost:8800/api/profile/update/profilePicture/${user._id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/JSON" },
              body: JSON.stringify({ profilePicture: downloadURL }),
            }
          );
        });
      }
    );
  };

  const refreshHandler = (e) => {
    e.preventDefault();
    getUserAction(dispatch, user._id);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users/get/userDetails/${c}`
        );
        // console.log(res.data, 89);
        setSuser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [c]);

  console.log(suser.followers, 7);

  const follower1 = suser.followers;

  console.log(follower1, 8);

  const [clicked, setClicked] = useState(false);

  const conHandler = async () => {
    if (follower1.includes(user._id)) {
      await unfollowHandler();
    } else {
      await followHandler();
    }
    buttonHandler();
  };

  const unfollowHandler = async () => {
    try {
      await axios.put(
        `http://localhost:8800/api/users/${suser._id}/unfollow`,
        { userId: user._id } // send current user ID in the request body
      );
    } catch (err) {
      console.log(err);
    }
  };

  const followHandler = async () => {
    try {
      await axios.put(
        `http://localhost:8800/api/users/${suser._id}/follow`,
        { userId: user._id } // send current user ID in the request body
      );
    } catch (err) {
      console.log(err);
    }
  };

  const buttonHandler = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    const getCons = async () => {
      try {
        const allcons = await axios.get(
          `http://localhost:8800/api/users/friends/${suser._id}`
        );
        console.log(allcons, 17);
        setCons(allcons.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (suser) {
      getCons();
    }
  }, [suser]);

  console.log(cons, 18);

  return (
    <>
      <Topbar />
      <div className="profPageContainer">
        <div className="profBox">
          <div className="profBoxWrapper">
            <div className="profBoxTop">
              <label htmlFor="file">
                <img
                  src={`${suser.coverPicture}`}
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
                <img
                  src={`${suser.profilePicture}`}
                  alt=""
                  className="profDp"
                />
                <input
                  type="file"
                  id="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </label>
              {suser.username !== user.username && (
                <button
                  className={clicked ? "profCon2" : "profCon"}
                  onClick={conHandler}
                >
                  Con/Dis
                </button>
              )}
              {suser.username === user.username && (
                <button className="profCon2">My Profile</button>
              )}
            </div>
            <div className="profInfo">
              <div className="profImg">
                <span className="profInfoName">{suser.username}</span>
                <AddPhotoAlternateIcon
                  className="profC"
                  onClick={submitHandler}
                />
                <span className="profCiconN">DP</span>
                <CameraIcon className="profC" onClick={submitHandler} />
                <span className="profCiconN">Cover</span>
                <button className="picUpButton" onClick={refreshHandler}>
                  Refresh
                </button>
              </div>
              <div className="profEdit">
                <span className="profBio">{suser.desc}</span>

                <Link
                  to={`/profUpdate/${suser.username}`}
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
                  <span className="profDetailsInfo">{suser.city}</span>
                </li>
                <li className="profDetailsListItem">
                  <WorkOutlineIcon className="profDetailsIcon" />
                  <span className="profDetailsName">Profession: </span>
                  <span className="profDetailsInfo">{suser.profession}</span>
                </li>
                <li className="profDetailsListItem">
                  <TimeToLeaveIcon className="profDetailsIcon" />
                  <span className="profDetailsName">Favourite Vehicle: </span>
                  <span className="profDetailsInfo">{suser.favVehicle}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="conneBox">
          <div className="conneBoxWrapper">
            <span className="conneBoxTitle">Connections</span>
            <div className="conneBoxMats">
              {cons.map((c) => (
                <Link
                  to={`/profile/${c._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="conneBoxMat">
                    <img
                      src={c.profilePicture}
                      alt=""
                      className="conneBoxMatImg"
                    />
                    <span className="conneBoxMatName">{c.username}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
