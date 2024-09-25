import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import axios from "axios";
import "./register.css";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    emailOrMobile: "",
    age: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = (fieldValues = formData) => {
    const newErrors = { ...errors };

    if ("fullName" in fieldValues)
      newErrors.fullName = fieldValues.fullName ? "" : "Please fill the name";
    if ("emailOrMobile" in fieldValues)
      newErrors.emailOrMobile = fieldValues.emailOrMobile
        ? ""
        : "Please fill the email or mobile number";
    if ("age" in fieldValues)
      newErrors.age = fieldValues.age ? "" : "Please fill the age";
    if ("gender" in fieldValues)
      newErrors.gender = fieldValues.gender ? "" : "Please select the gender";
    if ("password" in fieldValues)
      newErrors.password = fieldValues.password
        ? ""
        : "Please fill the password";
    if ("confirmPassword" in fieldValues)
      newErrors.confirmPassword = fieldValues.confirmPassword
        ? ""
        : "Please confirm the password";
    if (
      fieldValues.password &&
      fieldValues.confirmPassword &&
      fieldValues.password !== fieldValues.confirmPassword
    ) {
      toast.error("Passwords do not match");
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((x) => x === "");
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
        let dataToSubmit = {
          userName: formData.fullName,
          age: formData.age,
          gender: formData.gender,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        };
        if (validator.isEmail(formData.emailOrMobile)) {
          dataToSubmit.email = formData.emailOrMobile;
        } else {
          dataToSubmit.mobileNumber = formData.emailOrMobile;
        }
        const response = await axios.post(
          "http://44.196.192.232:3129/api/user/register",
          dataToSubmit
        );
        toast.success(response?.data?.message || "User registered successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        setFormData("");
        // if (response?.data === 201) {
          navigate('/login')
        // }
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data?.message;
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error("Network error or server is down. Please try again later.", {
            position: "top-right",
            autoClose: 3000,
          });
          console.error("Error registering user:", error);
        }
      }
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
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                />
                {errors.fullName && <p className="error">{errors.fullName}</p>}
              </label>
              <label>
                <h4>Email/Mobile Number</h4>
                <input
                  type="text"
                  name="emailOrMobile"
                  value={formData.emailOrMobile}
                  onChange={handleChange}
                  placeholder="Enter your email ID or Mobile Number"
                />
                {errors.emailOrMobile && (
                  <p className="error">{errors.emailOrMobile}</p>
                )}
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
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword}</p>
                )}
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
