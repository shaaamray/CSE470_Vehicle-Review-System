import "./login.css";
import {useRef, useContext} from "react";
import { logAction } from "../../redux/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Login() {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e)=>{
    e.preventDefault();
    logAction(dispatch, {email, password})
  }
  
  return (
    <div className="loginContainer">
        <div className="loginBox">
            <div className="loginWrapper">
                <div className="loginTop">
                    <img src="/assets/logo.png" alt="" className="loginLogo" />
                    <h4 className="loginName">Vehicle Review System</h4>
                </div>
                <form className="loginCreds">
                    <input placeholder="Enter your email" type="email" required className="loginCredInfo" name="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input placeholder="Password" className="loginCredInfo" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button className="loginButton" onClick={handleSubmit}>Login</button>
                    <span className="loginMsg">Forgot Password?</span>
                </form>
                <div className="loginBottom">
                    <Link to={`/signup`}>
                      <button className="loginReg">Create Account</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
