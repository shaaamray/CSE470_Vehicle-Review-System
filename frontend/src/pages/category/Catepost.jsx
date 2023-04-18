import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarRateIcon from "@mui/icons-material/StarRate";
import "./catepost.css";

import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Catepost({ cate1 }) {
  const [cuser, setCuser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users/get/userDetails/${cate1.userId}`
        );
        setCuser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  console.log(cuser._id, 1201);
  return (
    <div className="catepost">
      <div className="catepostWrapper">
        <div className="catepostTop">
          <div className="catepostTopLeft">
            <img
              src={cuser.profilePicture}
              alt=""
              className="catepostProfImg"
            />
            <span className="catepostUsername">{cuser.username}</span>
            <div className="catePostCat">
              <span className="catepostCategory">{cate1.category}</span>
            </div>
          </div>
          <div className="catepostTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="catepostCenter">
          <span className="catePostText">{cate1.desc}</span>
          <img src={cate1.img} alt="" className="catePostImg" />
        </div>
        <div className="catepostBottom">
          <div className="catepostBottomLeft">
            <img src="/assets/like.png" alt="" className="reactIcon" />
            <img src="/assets/love.png" alt="" className="reactIcon" />
            <span className="reactCounter"> {cate1.likes.length}</span>
          </div>
          <div className="catePostRating">
            {[...Array(5)].map((star, i) => {
              if (i + 1 <= cate1.averageRating) {
                return <StarRateIcon className="rating1StarColored" key={i} />;
              } else if (i < cate1.averageRating) {
                return <StarHalfIcon className="ratingStarColored" key={i} />;
              } else {
                return <StarRateIcon className="rating1Star" key={i} />;
              }
            })}

            {/* <span className="ratingText">{post.averageRating}</span> */}
          </div>
          <div className="catepostBottomRight">
            <span className="catepostReviews">
              {cate1.reviews.length} Reviews
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
