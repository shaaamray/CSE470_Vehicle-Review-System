import "./category.css";
import Topbar from "../../components/topbar/Topbar";
import Catepost from "./Catepost";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Category() {
  const [catepost, setCatepost] = useState([]);

  const data = useSelector((state) => state.user);
  const user = data.user;
  console.log(user);

  const { category } = useParams();
  console.log(category, 777);

  useEffect(() => {
    const getCatepost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/posts/category/${user._id}?category=${category}`
        );
        setCatepost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCatepost();
  }, [category]);
  console.log(catepost, 222);

  return (
    <>
      <Topbar />
      <div className="cateContainer">
        <div className="cateBox">
          <div className="cateWrapper">
            {catepost.map((p) => (
              <Catepost key={p.id} cate1={p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
