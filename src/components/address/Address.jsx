import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./address.css";

function Address() {
  const navigate = useNavigate();
  const location = useLocation();
  const [houseNo, setHouseNo] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (location.state && location.state.address) {
      const address = location.state.address;
      setHouseNo(address.houseNo);
      setMobileNumber(address.mobileNumber);
      setPinCode(address.pinCode);
      setCity(address.city);
      setState(address.state);
      setIsEditing(true);
      setEditIndex(location.state.index);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAddress = {
      houseNo,
      mobileNumber,
      pinCode,
      city,
      state,
    };

    let updatedAddresses = [];
    if (isEditing) {
      // Editing existing address
      updatedAddresses = [...location.state.allAddresses];
      updatedAddresses[editIndex] = newAddress;
    } else {
      // Adding new address
      updatedAddresses = [...location.state?.allAddresses || [], newAddress];
    }

    navigate("/shopcheckout", { state: { addresses: updatedAddresses } });
  };

  return (
    <div className="address">
      <div className="address-container">
        <div className="address-banner">
          <h1>{isEditing ? "Edit Address" : "Add Address"}</h1>
        </div>

        <div className="add-form container">
          <form className="address-form" onSubmit={handleSubmit}>
            <div className="conA-form">
              <div className="first-inputs comm">
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
              </div>
              <div className="second-inputs comm">
                <label>
                  <h4>Pin Code</h4>
                  <input
                    type="number"
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
                    <option value="London">London</option>
                    <option value="Manchester">Manchester</option>
                    <option value="Birmingham">Birmingham</option>
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
                    <option value="England">England</option>
                    <option value="Scotland">Scotland</option>
                    <option value="Wales">Wales</option>
                  </select>
                </label>
              </div>
              <div className="third-inputs">
                <p>
                  Lorem Ipsum is simply dummy text of the printing industry's
                  standard dummy text ever since the 1500s.
                </p>
              </div>
              <div className="address-button">
                <button type="submit">
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Address;
