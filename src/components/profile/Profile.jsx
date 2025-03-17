import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile.css";
import axios from "axios";

function Profile() {
  const fileInput = useRef(null);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
  });

  // Fetch user details
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://www.millysshop.se/api/user/676914593d59cbf9fb374b91"
        );
        const userData = response.data;

        setFormData({
          fullName: userData.fullName || "",
          mobileNumber: userData.mobile || "",
          email: userData.email || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user details");
      }
    };

    fetchUserData();
  }, []);

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Your data is updated successfully");
    event.target.reset();
    setImage("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-banner">
          <h1>Profile</h1>
        </div>
        <form className="profile-info container" onSubmit={handleSubmit}>
          <div className="img-upload">
            <div className="img-wrapper" onClick={handleClick}>
              {image ? (
                <img src={image} alt="Profile" className="uploaded-image" />
              ) : (
                <p>
                  <i className="bx bxs-cloud-upload"></i>
                </p>
              )}
            </div>
            <h2 style={{ color: "black" }}>Upload Image <i className="bx bxs-cloud-upload"></i></h2>
            <input
              type="file"
              ref={fileInput}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="img-info">
            <div className="img-info-name">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={(e) =>
                  setFormData({ ...formData, mobileNumber: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email ID"
                value={formData.email}
                disabled
              />
            </div>
            <div className="img-info-butt">
              <button type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
