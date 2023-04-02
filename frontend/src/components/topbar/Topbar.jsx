import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/userSlice";

export default function Topbar() {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(signOut());
  };

  const data = useSelector((state) => state.user);
  const user = data.user;
  console.log(user)

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
          <img src="/assets/logo.png" alt="" className="logo" />
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input placeholder="search anything" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}>
            <span className="topbarLink">Profile</span>
          </Link>
          <span className="topbarLink">Post</span>
          <Link to={`/login`} style={{ textDecoration: "none" }}>
            <span className="topbarLink" onClick={handleSubmit}>
              Log Out
            </span>
          </Link>
        </div>
        <img
          src={`${user.profilePicture}`}
          alt=""
          className="topbarImg"
        />
      </div>
    </div>
  );
}
