import "./con.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Con({ conns }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  const user = data.user;
  const [clicked, setClicked] = useState(false);

  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const getFol = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users/followings/only/${user._id}`
        );
        setFollowing(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFol();
  }, [user._id]);

  const clickHandler = async () => {
    if (following.includes(conns._id)) {
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
      setFollowing([...following, conns._id]);
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
      setFollowing(following.filter((id) => id !== conns._id));
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
