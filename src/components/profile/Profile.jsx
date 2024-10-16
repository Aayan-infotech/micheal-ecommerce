import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./profile.css";

function Profile() {
  const fileInput = useRef(null);
  const [image, setImage] = useState("");

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success('Your data is Updated. Successfully');
    event.target.reset();
    setImage("");
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if(file != null){
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        }
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
                {image ? (<img src={image} alt="Profile" className="uploaded-image" />) : (<p><i className="bx bxs-camera"></i></p>)}
            </div>
            <h2 style={{ color: "black" }}>Upload Image</h2>
            <input type="file" ref={fileInput} onChange={handleFileChange} style={{ display: 'none' }}/>
          </div>
          <div className="img-info">
            <div className="img-info-name">
              <input type="text" placeholder="Full Name" required/>
              <input type="text" placeholder="Mobile Number" required/>
              <input type="text" placeholder="Email Id" required/>
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
