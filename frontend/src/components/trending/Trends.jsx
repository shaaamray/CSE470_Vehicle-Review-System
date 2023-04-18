import "./trends.css";

import React from "react";

export default function Trends({ trend }) {
  console.log(trend, 303);

  const redirect = `${trend.url}`;

  console.log(trend.webName, 78);

  return (
    <div className="trendBox">
      <div className="trendBoxWrapper">
        <div className="trendBoxMat">
          <span
            className="trendBoxTitle"
            onClick={() => {
              window.location.href = redirect;
            }}
          >
            {trend.webName}
          </span>
          <img
            src={trend.homeImg}
            alt=""
            className="trendBoxThumbnail"
            onClick={() => {
              window.location.href = redirect;
            }}
          />
        </div>
      </div>
    </div>
  );
}
