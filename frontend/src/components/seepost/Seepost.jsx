import "./seepost.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { async } from "@firebase/util";

export default function Seepost({ post }) {
  console.log(post);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false); // initially false
  const [currentuser, setCurrentuser] = useState({});

  const [showsection, setShowsection] = useState(false);
  const [review, setReview] = useState(post.reviews);
  const [reviewWriting, setReviewWriting] = useState("");
  const [rating, setRating] = useState(0);

  const data = useSelector((state) => state.user);
  const user = data.user;

  console.log(user.username, 100);

  const showSectionHandler = () => {
    setShowsection(!showsection);
  };

  const reviewHandler = async () => {
    await addReview();
    avgRating();
  };
  console.log(user, 100);

  const addReview = async () => {
    try {
      const dummyReview = {
        postid: post._id,
        userName: user.username,
        userImg: user.profilePicture,
        review: reviewWriting,
        rating: rating,
      };
      await axios.put(`http://localhost:8800/api/posts/review`, dummyReview);
      setReview(review.concat(dummyReview));
    } catch (err) {
      console.log(err);
    }
  };

  const avgRating = async () => {
    try {
      await axios.get(`http://localhost:8800/api/posts/rating/${post._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(post, 123);

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  // get details of the corresponding user of the post

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users/get/userDetails/${post.userId}`
        );
        setCurrentuser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);
  console.log(currentuser._id, 2000);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: user._id });
    } catch (err) {
      console.log(err);
    }

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked); // true
  };

  return (
    <div className="seepost">
      <div className="seepostWrapper">
        <div className="seepostTop">
          <div className="seepostTopLeft">
            <img
              className="seepostProfImg"
              src={currentuser.profilePicture}
              alt=""
            />
            <span className="seepostUsername">{currentuser.username}</span>
            <div className="seePostCat">
              <span className="seepostCategory">{post.category}</span>
            </div>
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
            <span className="reactCounter"> {like} React</span>
          </div>
          <div className="seePostRating">
            {[...Array(5)].map((star, i) => {
              if (i + 1 <= post.averageRating) {
                return <StarRateIcon className="ratingStarColored" key={i} />;
              } else if (i < post.averageRating) {
                return <StarHalfIcon className="ratingStarColored" key={i} />;
              } else {
                return <StarBorderIcon className="ratingStar" key={i} />;
              }
            })}

            {/* <span className="ratingText">{post.averageRating}</span> */}
          </div>
          <div className="seepostBottomRight">
            <span className="seepostReviews" onClick={showSectionHandler}>
              {review.length} Reviews
            </span>
          </div>
        </div>
        {showsection === true ? (
          <div className="review">
            <div className="createReview">
              <img src={user.profilePicture} alt="" className="reviewerImg" />
              {/* <p className="reviewerUsername">{user.username}</p> */}
              <input
                type="text"
                className="writeReview"
                placeholder="Share your review"
                onChange={(e) => {
                  setReviewWriting(e.target.value);
                }}
              />
              <div className="shareOption">
                <label htmlFor="category-select">Rating: </label>
                <select
                  id="category-select"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  {/* <option value="">Stars</option> */}
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <button className="doReview" onClick={reviewHandler}>
                Review
              </button>
            </div>
            {review.map((items) => (
              <div className="seeReviews">
                <div className="seeReviewsUserInfo">
                  <img src={items.userImg} alt="" className="reviewerImg" />
                  <span className="reviewerUsername">{items.userName}</span>
                </div>
                <div className="seeReviewsData">
                  <span className="reviews">{items.review}</span>
                  <div className="seeReviewerRating">
                  {[...Array(5)].map((star, i) => {
                    if (i + 1 <= items.rating) {
                      return (
                        <StarRateIcon className="ratingStarColored" key={i} />
                      );
                    } else if (i < items.rating) {
                      return (
                        <StarHalfIcon className="ratingStarColored" key={i} />
                      );
                    } else {
                      return <StarRateIcon className="ratingStarEmpty" key={i} />;
                    }
                  })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
