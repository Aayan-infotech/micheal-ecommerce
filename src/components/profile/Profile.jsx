import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile.css";
import axios from "axios";

function Profile() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
  });

  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.12:3129/api/user/${userId}`
      );
      const userData = response.data;

      setFormData({
        fullName: userData.userName || "",
        mobileNumber: userData.mobileNumber || "",
        email: userData.email || "",
      });
    } catch (error) {
      toast.error("Failed to load user details");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      toast.error("Mobile number must be exactly 10 digits.");
      return; // Prevent API call
    }
    setBtnLoading(true);
    try {
      const response = await axios.put(
        `http://192.168.1.12:3129/api/user/edit/${userId}`,
        {
          mobileNumber: formData.mobileNumber,
          fullName: formData.fullName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchUserData();
        setEditMode(false);
        toast.success("Your profile has been updated successfully!", {
          autoClose: 1000,
        });
      } else {
        toast.error("Failed to update profile. Please try again.", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!", {
        autoClose: 2000,
      });
    }
    setBtnLoading(false);
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-banner">
          <h1>Profile</h1>
        </div>
        <form className="profile-info container" onSubmit={handleSubmit}>
          <div className="img-info">
            <div className="img-info-name">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                disabled={!editMode}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                disabled={!editMode}
                onChange={(e) =>
                  setFormData({ ...formData, mobileNumber: e.target.value })
                }
                required
                pattern="^\d{10}$"
                title="Mobile number must be exactly 10 digits"
              />
              <input
                type="email"
                placeholder="Email ID"
                value={formData.email}
                disabled
              />
            </div>
            <div className="img-info-butt">
              {editMode && (
                <button type="submit" disabled={btnLoading}>
                  {btnLoading ? "Updating..." : "Update Profile Details"}
                </button>
              )}
              {!editMode && (
                <button type="button" onClick={() => setEditMode(true)}>
                  <i className="bx bx-edit"></i> Edit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
