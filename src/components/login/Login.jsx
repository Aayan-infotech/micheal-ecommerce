import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";
import Loading from '../loader/Loading';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/liginSlice';

function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.emailOrUsername || !formData.password) {
      toast.error("Please enter email/username and password", { autoClose: 1000 });
      return;
    }
    setLoading(true);
    try {
      const response = await dispatch(loginUser(formData)).unwrap();
      if (response.success) {
        toast.success(response?.message || 'Login Successful', { autoClose: 1000 });
        navigate('/home');
      } else {
        toast.error(response?.message || 'Login failed', { autoClose: 1000 });
      }
    } catch (error) {
      toast.error(error || 'Something went wrong. Please try again.', { autoClose: 1000 });
    }finally {
          setLoading(false);
        }
  };
  
  return (
    <>
      <ToastContainer />
      <div className="login">
        {loading ? (
          <Loading />
        ) : (
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
            <p className="login-link" style={{color:"white", fontWeight:"bold"}}>
              Haven't any account? <Link to="/register">Signup</Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
