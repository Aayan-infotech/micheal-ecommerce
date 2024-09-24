import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";

function Login() {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if fields are filled
    if (!formData.emailOrUsername || !formData.password) {
      toast.error("Please enter email/username and password");
      return;
    }
    console.log("Sending login request:", formData);
    try {
      const response = await axios.post('http://3.111.163.2:3129/api/auth/login', formData);
      if(response.data.success)
      {
        const {token} = response.data;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', response.data?.data?.id);
        toast.success("Login Successful!");
        navigate('/home'); 
      }
      else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error.response);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="container login-contain">
        <h1 className="sign">Login</h1>
        <div className="form">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="l-form">
              <label>
                <h4>Email/Mobile Number</h4>
                <input
                  type="text"
                  name="emailOrUsername"
                  value={formData.emailOrUsername}
                  onChange={handleChange}
                  placeholder="Enter your email or mobile number"
                />
              </label>
              <label>
                <h4>Password</h4>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="***********"
                />
              </label>
              <label className='fpass'>
                <Link to="/passwordrecovery">Forgot password ?</Link>
              </label>
            </div>
            <button type="submit">Log In</button>
          </form>
        </div>
        <p className="login-link">
          Haven't any account? <Link to="/register">Signup</Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
