import "./categories.css";

import React from "react";

export default function Categories() {
  return (
    <div className="cateBox">
      <div className="cateBoxWrapper">
        <div className="cateBoxTop">
          <span className="cateTitle">Categories</span>
        </div>
        <div className="cateBoxDown">
          <div className="cateEach">
            <span className="cateName">Car</span>
            <img
              src="https://i.ytimg.com/vi/DAOMG0N3qqA/maxresdefault.jpg"
              alt=""
              className="cateImg"
            />
          </div>
          <div className="cateEach">
            <span className="cateName">SUV</span>
            <img
              src="https://cdn.dribbble.com/users/3973029/screenshots/10536641/jeep.png"
              alt=""
              className="cateImg"
            />
          </div>
          <div className="cateEach">
            <span className="cateName">Bike</span>
            <img
              src="https://i.pinimg.com/originals/62/46/5e/62465e3368d17d9c91897ca3e92d94d7.png"
              alt=""
              className="cateImg"
            />
          </div>
          <div className="cateEach">
            <span className="cateName">Bus</span>
            <img
              src="https://rare-gallery.com/uploads/posts/1183071-vehicle-buses-transport-ArseniXC-Ikarus-256-bus-metropolitan-area-land-vehicle-mode-of-transport-public-transport-rolling-stock-railroad-car.jpg"
              alt=""
              className="cateImg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
