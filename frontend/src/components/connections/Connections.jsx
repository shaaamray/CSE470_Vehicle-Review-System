import Con from "./Con";
import "./connections.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Connections() {
  const data = useSelector((state) => state.user);
  const user = data.user;
  const [cons, setCons] = useState([]);

  useEffect(() => {
    const getCons = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users/unknown/con/${user._id}`
        );
        setCons(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCons();
  }, [user._id]);

  return (
    <div className="connectionBox">
      <div className="connectionBoxWrapper">
        <div className="connectionBoxTop">
          <span className="connectionTitle">Suggestions</span>
        </div>
        <div className="connectionBoxDown">
          {cons.map((p) => (
            <Con key={p.id} conns={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
