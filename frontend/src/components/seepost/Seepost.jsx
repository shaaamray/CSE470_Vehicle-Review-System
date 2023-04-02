import "./seepost.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Users } from "../../dummyData";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Seepost({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [postuser, setPostuser] = useState({});

  const data = useSelector((state) => state.user);
  const user = data.user;
  console.log(user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users/get/userDetails/${post.userId}`
        );
        setPostuser(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);
  console.log(postuser, 1000)

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="seepost">
      <div className="seepostWrapper">
        <div className="seepostTop">
          <div className="seepostTopLeft">
            <img className="seepostProfImg" src={postuser.profilePicture} alt="" />
            <span className="seepostUsername">{postuser.username}</span>
            <span className="seepostDate">{post.date}</span>
          </div>
          <div className="seepostTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="seepostCenter">
          <span className="seepostText">{post.desc}</span>
          <img src={post.img} alt="" className="seepostImg" />
        </div>
        <div className="seepostBottom">
          <div className="seepostBottomLeft">
            <img
              src="/assets/like.png"
              alt=""
              onClick={likeHandler}
              className="reactIcon"
            />
            <img
              src="/assets/love.png"
              alt=""
              onClick={likeHandler}
              className="reactIcon"
            />
            <span className="reactCounter"> {like} people reacted</span>
          </div>
          <div className="seepostBottomRight">
            <span className="seepostReviews"> {post.comment} reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
}
