import { useState } from "react";
import "./signup.css";
import { regAction } from "../../redux/api";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const data = {username, email, password};

  const handleSubmit = (e) => {
    e.preventDefault();
    regAction(dispatch, { username, email, password });
  };
  console.log(username, email, password);
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <div className="loginWrapper">
          <div className="loginTop">
            <img src="/assets/logo.png" alt="" className="loginLogo" />
            <h4 className="loginName">Vehicle Review System</h4>
          </div>
          <div className="loginCreds">
            <input
              placeholder="Enter username"
              className="loginCredInfo"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Enter your email"
              className="loginCredInfo"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="loginCredInfo"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <input placeholder="Confirm Password" className="loginCredInfo" /> */}
            <button className="loginButton" onClick={handleSubmit}>
              Signup
            </button>
            <span className="loginMsg">Already have an account?</span>
          </div>
          <Link to={`/login`} style={{ textDecoration: "none" }}>
            <div className="loginBottom">
              <button className="signupReg">Login</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
