import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./address.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const address = location.state?.address;
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (address) {
      setName(address.receiverName || "");
      setHouseNo(address.houseNumber || "");
      setMobileNumber(address.contactNumber || "");
      setPinCode(address.pinCode || "");
      setCity(address.city || "");
      setState(address.state || "");
      setCountry(address.country || "");
      setAddress(address.area || "");
      setIsEditing(true);
      setEditIndex(address._id);
    }
  }, [address]);

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10}$/;
    const pinRegex = /^[0-9]{5,6}$/;

    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!phoneRegex.test(mobileNumber)) {
      toast.error("Mobile number must be 10 digits");
      return false;
    }
    if (!houseNo.trim()) {
      toast.error("House number is required");
      return false;
    }
    if (!pinRegex.test(pinCode)) {
      toast.error("Pin code must be 5-6 digits");
      return false;
    }
    if (!country.trim()) {
      toast.error("Country is required");
      return false;
    }
    if (!state.trim()) {
      toast.error("State is required");
      return false;
    }
    if (!city.trim()) {
      toast.error("City is required");
      return false;
    }
    if (!address1.trim()) {
      toast.error("Address is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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
        const response1 = await fetch(
          `https://ecom.atulrajput.tech/api/address/update/${address?._id}`,
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
          navigate("/shopcheckout", {
            state: {
              addresses: [...(location.state?.allAddresses || [])].map((addr) =>
                addr._id === address._id ? newAddress : addr
              ),
            },
          });
        }
      } else {
        const response = await fetch(
          "https://ecom.atulrajput.tech/api/address/add",
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
          navigate("/shopcheckout", {
            state: {
              addresses: [...(location.state?.allAddresses || []), newAddress],
            },
          });
        }
      }
    } catch (error) {
      toast.error("Error adding/updating address: " + error.message);
    }
  };

  return (
    <>
      <ToastContainer />
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
                      type="tel"
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
                    <h4>Country</h4>
                    <input
                      type="text"
                      placeholder="Enter Country Name"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    <h4>State</h4>
                    <input
                      type="text"
                      placeholder="Enter State Name"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    <h4>City</h4>
                    <input
                      type="text"
                      placeholder="Enter City Name"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
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
                <div className="third-inputs"></div>
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
