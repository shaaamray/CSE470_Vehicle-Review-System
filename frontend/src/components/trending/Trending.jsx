import "./trending.css";

import Trends from "./Trends";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Trending() {

  const [alltrends, setAlltrends] = useState([]);

  useEffect(() => {
    const getTrends = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/trendings/all/trending"
        );
        setAlltrends(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTrends();
  }, []);

  console.log(alltrends, 505);

  return (
    <div className="trendingBox">
      <div className="trendingBoxWrapper">
        <div className="trendingBoxTop">
          <span className="trendingTitle">Trending Vehicles</span>
        </div>
        <div className="trendingBoxMid">
          {alltrends.map((p) => (
            <Trends key={p.id} trend={p}/>
          ))}
        </div>
      </div>
    </div>
  );
}
