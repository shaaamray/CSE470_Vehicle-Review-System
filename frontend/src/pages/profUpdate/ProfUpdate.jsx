import "./profUpdate.css";
import Topbar from "../../components/topbar/Topbar";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { profUpdateAction } from "../../redux/api";
// import axios from "axios";

export default function ProfileUpdate() {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("");
  const [profession, setProfession] = useState("");
  const [favVehicle, setFavVehicle] = useState("");

  const data = useSelector(state =>state.user)
  const user = data.user

  const handleSubmit = (e) =>{
    e.preventDefault();
    // actions are dispatched to the store
    profUpdateAction(dispatch, {desc, city, profession, favVehicle}, user._id)
    // await axios.put(`http://localhost:8800/api/users/${user._id}`, {desc, city, profession, favVehicle})
  };

  console.log(user)

  return (
    <>
      <Topbar />
      <div className="profPageContainer">
        <div className="profBox">
          <div className="profBoxWrapper">
            <div className="profBoxTop">
              <img src={`${user.coverPicture}`} alt="" className="profCover" />
              <img src={`${user.profilePicture}`} alt="" className="profDp" />
            </div>
            <div className="profInfo">
              <h4 className="profInfoName">{user.username}</h4>
              <div className="profEdit">
                <span className="profBio">{user.desc}</span>
                <EditIcon className="editIcon"></EditIcon>
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
        <div className="updateBox">
          <div className="updateBoxWrapper">
            <div className="updateInfos">
              <span className="updateInfoTitle">Your Bio</span>
              <input
                type="text"
                className="updateInfo"
                placeholder="set your bio"
                username = "desc"
                onChange={(e)=>setDesc(e.target.value)}
              />
              <span className="updateInfoTitle">Your City</span>
              <input
                type="text"
                className="updateInfo"
                placeholder="where you live in?"
                username = "city"
                onChange={(e)=>setCity(e.target.value)}
              />
              <span className="updateInfoTitle">Your Profession</span>
              <input
                type="text"
                className="updateInfo"
                placeholder="what is your profession?"
                username = "profession"
                onChange={(e)=>setProfession(e.target.value)}
              />
              <span className="updateInfoTitle">Your favourite Vehicle</span>
              <input
                type="text"
                className="updateInfo"
                placeholder="what is your fav vehicle?"
                username = "favVehicle"
                onChange={(e)=>setFavVehicle(e.target.value)}
              />
              <button className="updateInfoButton" onClick={handleSubmit}>Update Info</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
