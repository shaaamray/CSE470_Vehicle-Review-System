import "./con.css";

import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Con({ conns }) {
  const data = useSelector((state) => state.user);
  const user = data.user;
  const [clicked, setClicked] = useState(false);
  const [isfollowing, setIsfollowing] = useState(user.followings);

  const clickHandler = async () => {
    if (isfollowing.includes(conns._id)) {
      await unfollowHandler();
    } else {
      await followHandler();
    }
    buttonHandler();
  };

  const followHandler = async () => {
    try {
      await axios.put(
        `http://localhost:8800/api/users/${conns._id}/follow`,
        { userId: user._id } // send current user ID in the request body
      );
      setIsfollowing([...isfollowing, conns._id]);
    } catch (err) {
      console.log(err);
    }
  };

  const unfollowHandler = async () => {
    try {
      await axios.put(
        `http://localhost:8800/api/users/${conns._id}/unfollow`,
        { userId: user._id } // send current user ID in the request body
      );
      setIsfollowing(isfollowing.filter((id) => id !== conns._id));
    } catch (err) {
      console.log(err);
    }
  };

  const buttonHandler = () => {
    setClicked(!clicked);
  };

  return (
    <div className="conBox">
      <div className="conBoxWrapper">
        <div className="conBoxMat">
          <span className="conBoxName">{conns.username}</span>
          <img src={conns.profilePicture} alt="" className="conBoxImg" />
          <button
            onClick={clickHandler}
            className={clicked ? "conBoxButton2" : "conBoxButton"}
          >
            {clicked ? "Yahoo!" : "Connect"}
          </button>
        </div>
      </div>
    </div>
  );
}
