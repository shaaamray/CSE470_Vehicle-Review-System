import "./feed.css";
import Seepost from "../seepost/Seepost";
import Makepost from "../makepost/Makepost";
// import { Posts } from "../../dummyData";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Feed() {
  const [allpost, setAllpost] = useState([]);

  const data = useSelector((state) => state.user);
  const user = data.user;
  console.log(user);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/posts/homepage/${user._id}`
        );
        setAllpost(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);
  console.log(allpost)

  return (
    <div className="feed">
      <div className="seePost">
        <div className="seePostWrapper">
          {allpost.map((p) => (
            <Seepost key={p.id} post={p} />
          ))}
        </div>
      </div>
      <div className="makePost">
        <div className="makePostWrapper">
          <Makepost />
        </div>
      </div>
      <div className="suggetion">
        <h4>Category</h4>
      </div>
    </div>
  );
}
