import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  return (
    <div className="login">
      <div className="container login-contain">
        <h1 className="sign">Login</h1>
        <div className="form">
          <form className="login-form">
            <div className="lo-form">
              <label>
                <h4>Email/Mobile Number</h4>
                <input type="text" placeholder="Enter your email ID" />
              </label>
              <label>
                <h4>Password</h4>
                <input type="password" placeholder="***********" />
              </label>
              <label className="fpass">
                <Link to="/passwordrecovery">Forgot password ?</Link>
              </label>
            </div>
            <button type="submit">Log In</button>
          </form>
        </div>
        <p className="login-link">
          Haven't any account? <Link to="/register">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
