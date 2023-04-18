import BackspaceIcon from "@mui/icons-material/Backspace";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../../redux/userSlice";
import "./topbar.css";
// import { clear } from "console";

export default function Topbar() {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(signOut());
  };

  const data = useSelector((state) => state.user);
  const user = data.user;
  console.log(user);

  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [clear, setClear] = useState(true);

  const searchHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/search/user/prof?q=${search}`
      );
      setClear(false);
      setResult(res.data);
      setSearch(false);
    } catch (err) {
      console.log(err);
    }
  };

  const searchClrHandler = () => {
    setClear(true);
    setResult([]);
  };

  console.log(result, 343);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
          <img src="/assets/logo.png" alt="" className="logo" />
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <input
            placeholder="search anything"
            className="searchInput"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchHandler();
              }
            }}
          />
          {clear === true ? (
            <SearchIcon className="searchIcon" onClick={searchHandler} />
          ) : (
            <BackspaceIcon className="searchIcon" onClick={searchClrHandler} />
          )}
        </div>
        <div className="simUsers">
          {result.length > 0 && (
            <div className="similar">
              {result.map((r) => (
                <Link
                  to={`/profile/${r._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="searchOptions">
                    <img
                      src={`${r.profilePicture}`}
                      alt=""
                      className="searchOptionImg"
                    />
                    <span className="searchOptionName">{r.username}</span>
                  </div>
                  <hr className="searchOptionHR" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none" }}>
            <span className="topbarLink">Profile</span>
          </Link>
          <span className="topbarLink">Post</span>
          <Link to={`/login`} style={{ textDecoration: "none" }}>
            <span className="topbarLink" onClick={handleSubmit}>
              Log Out
            </span>
          </Link>
        </div>
        <img src={`${user.profilePicture}`} alt="" className="topbarImg" />
      </div>
    </div>
  );
}
