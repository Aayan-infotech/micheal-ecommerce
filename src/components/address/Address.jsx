import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./address.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Address() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address1, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);


  // const token = sessionStorage.getItem("token");
  // const truncateToken = token.slice(0, 25);
  const address = location.state.address;
  const addresss = location.state.address;
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (addresss) {
      setName(address?.receiverName || '');
      setHouseNo(address?.houseNumber || '');
      setMobileNumber(address?.contactNumber || '');
      setPinCode(address?.pinCode || '');
      setCity(address?.city || '');
      setState(address?.state || '');
      setCountry(address?.country || '');
      setAddress(address?.area || '');
      setIsEditing(true);
      setEditIndex(addresss?._id);
    }
  }, [addresss]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAddress = {
      userId: userId,
      houseNumber: houseNo,
      state: state,
      city: city,
      pinCode: pinCode,
      contactNumber: mobileNumber,
      receiverName: name,
      country: country,
      area: address1,
    };

    try {
      if (isEditing) {
        // const addressId = sessionStorage.getItem("addressId");

        const response1 = await fetch(
          `http://3.111.163.2:3129/api/address/update/${addresss?._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newAddress),
          }
        );
        const result2 = await response1.json();

        if (result2.success) {
          const updatedAddresses = [...(location.state?.allAddresses || [])];
          updatedAddresses[editIndex] = newAddress;

          navigate("/shopcheckout", {
            state: {
              addresses: updatedAddresses,
            },
          });
        }
      } else {
        const response = await fetch(
          "http://3.111.163.2:3129/api/address/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newAddress),
          }
        );
        const result = await response.json();
        if (result.success) {
          // sessionStorage.setItem("addressId", result.data._id);
          navigate("/shopcheckout", {
            state: {
              addresses: [...(location.state?.allAddresses || []), newAddress],
            },
          });
        }
      }
    } catch (error) {
      console.error("Error adding/updating address:", error);
    }
  };

  return (
    <>
      ToastContainer
      <div className="address">
        <div className="address-container">
          <div className="address-banner">
            <h1>{isEditing ? "Edit Address" : "Add Address"}</h1>
          </div>

          <div className="add-form container">
            <form className="address-form" onSubmit={handleSubmit}>
              <div className="conA-form">
                <div className="first1-inputs comm">
                  <label>
                    <h4>Name</h4>
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    <h4>Mobile Number</h4>
                    <input
                      type="text"
                      placeholder="Enter Mobile Number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    <h4>House No.</h4>
                    <input
                      type="text"
                      placeholder="Enter House Number"
                      value={houseNo}
                      onChange={(e) => setHouseNo(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="first-inputs comm">
                  <label>
                    <h4>Pin Code</h4>
                    <input
                      type="text"
                      placeholder="Enter Pin Code"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    <h4>City</h4>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    >
                      <option value="">Select City</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Chennai">Chennai</option>
                    </select>
                  </label>
                  <label>
                    <h4>State</h4>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    >
                      <option value="">Select State</option>
                      <option value="KA">Karnataka</option>
                      <option value="MH">Maharashtra</option>
                      <option value="TN">Tamil Nadu</option>
                    </select>
                  </label>
                  <label>
                    <h4>State</h4>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="india">India</option>
                      <option value="russia">Russia</option>
                      <option value="china">China</option>
                    </select>
                  </label>
                </div>
                <div className="second-inputs comm">
                  <label>
                    <h4>Address *</h4>
                    <textarea
                      placeholder="Enter your address..."
                      rows="6"
                      cols="70"
                      value={address1}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    ></textarea>
                  </label>
                </div>
                <div className="third-inputs">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing industry's
                    standard dummy text ever since the 1500s.
                  </p>
                </div>
                <div className="address-button">
                  <button type="submit">{isEditing ? "Update" : "Save"}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Address;
