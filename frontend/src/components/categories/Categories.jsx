import "./categories.css";

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import cates from "./Cates";

export default function Categories() {
  const data = useSelector((state) => state.user);
  const user = data.user;

  const c = cates;

  console.log(c, 19);

  return (
    <div className="catemBox">
      <div className="catemBoxWrapper">
        <div className="catemBoxTop">
          <span className="catemTitle">Categories</span>
        </div>
        <div className="catemBoxDown">
          {c.map((category) => (
            <Link to={`/category/${category.name}`} style={{ textDecoration: "none" }}>
              <div className="catemEach">
                <span className="catemName">{category.name}</span>
                <img
                  src={category.img}
                  alt=""
                  className="catemImg"
                />
              </div>
            </Link>
          ))}

          {/* <div className="catemEach">
            <span className="catemName">SUV</span>
            <img
              src="https://cdn.dribbble.com/users/3973029/screenshots/10536641/jeep.png"
              alt=""
              className="catemImg"
            />
          </div>
          <div className="catemEach">
            <span className="catemName">Bike</span>
            <img
              src="https://i.pinimg.com/originals/62/46/5e/62465e3368d17d9c91897ca3e92d94d7.png"
              alt=""
              className="catemImg"
            />
          </div>
          <div className="catemEach">
            <span className="catemName">Bus</span>
            <img
              src="https://rare-gallery.com/uploads/posts/1183071-vehicle-buses-transport-ArseniXC-Ikarus-256-bus-metropolitan-area-land-vehicle-mode-of-transport-public-transport-rolling-stock-railroad-car.jpg"
              alt=""
              className="catemImg"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
