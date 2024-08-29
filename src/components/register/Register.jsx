import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./register.css";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    mobileNumber: '',
    age: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const validate = (fieldValues = formData) => {
    const newErrors = { ...errors };

    if ("fullName" in fieldValues)
      newErrors.fullName = fieldValues.fullName ? "" : "Please fill the name";
    if ("emailOrMobile" in fieldValues)
      newErrors.emailOrMobile = fieldValues.emailOrMobile ? "" : "Please fill the email or mobile number";
    if ("age" in fieldValues)
      newErrors.age = fieldValues.age ? "" : "Please fill the age";
    if ("gender" in fieldValues)
      newErrors.gender = fieldValues.gender ? "" : "Please select the gender";
    if ("password" in fieldValues)
      newErrors.password = fieldValues.password ? "" : "Please fill the password";
    if ("confirmPassword" in fieldValues)
      newErrors.confirmPassword = fieldValues.confirmPassword ? "" : "Please confirm the password";
    if (fieldValues.password && fieldValues.confirmPassword && fieldValues.password !== fieldValues.confirmPassword) {
      toast.error("Passwords do not match");
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(x => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (formData) {
          const { confirmPassword, ...filteredFormData } = formData;
          if(filteredFormData) {
            const res = await axios.post("http://13.200.240.28:3003/api/user/register", formData);
  
            console.log(res);
            if(res.status === 201) {
              navigate("/login");
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
      
      console.log("Form submitted successfully");
    }
  };

  return (
    <div className="register">
      <div className="container">
        <h1 className="sign">Sign Up</h1>
        <div className="form">
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="s-form">
              <label>
                <h4>Full Name</h4>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                />
                {errors.fullName && <p className="error">{errors.fullName}</p>}
              </label>
              <label>
                <h4>Email</h4>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email ID or Mobile Number"
                />
                {errors.emailOrMobile && <p className="error">{errors.emailOrMobile}</p>}
              </label>
              <label>
                <h4>Mobile</h4>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter your Mobile Number"
                />
                {errors.emailOrMobile && <p className="error">{errors.emailOrMobile}</p>}
              </label>
              <div className="form-group">
                <label>
                  <h4>Age</h4>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter Age"
                  />
                  {errors.age && <p className="error">{errors.age}</p>}
                </label>
                <label>
                  <h4>Gender</h4>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="error">{errors.gender}</p>}
                </label>
              </div>
              <label>
                <h4>Password</h4>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="***********"
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </label>
              <label>
                <h4>Confirm Password</h4>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="***********"
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
              </label>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <p className="login-link">
          Have account? <Link to="/login">Login</Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
