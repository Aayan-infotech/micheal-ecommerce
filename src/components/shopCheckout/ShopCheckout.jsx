import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./shopcheckout.css";
import { Link } from "react-router-dom";

function ShopCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const addresses = location.state?.addresses || [];

  const handleEdit = (index) => {
    navigate("/address", {
      state: { address: addresses[index], index, allAddresses: addresses },
    });
  };
  const handleAdd = () => {
    navigate("/address", { state: { allAddresses: addresses } });
  };

  const handleDelete = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    navigate("/shopcheckout", { state: { addresses: updatedAddresses } });
  };

  return (
    <div className="shopcheckout">
      <div className="shopcheckout-container">
        <div className="shopcheckout-banner">
          <h1>Checkout</h1>
        </div>
        <div className="delivery-address container section">
          <div className="address-side">
            <h2 style={{ color: "black", marginBottom: "15px" }}>
              <i className="bx bx-location-plus"></i> Delivery Address
            </h2>

            {addresses.map((address, index) => (
              <div key={index} className="address-card">
                <div className="first-address-nav">
                  <h3 style={{ color: "black", marginBottom: "10px" }}>
                    Address:
                  </h3>
                  <h4>{address.receiverName} {address.contactNumber}</h4>
                  <p>
                    {address.houseNumber}, {address.area}, {address.city},{" "}
                    {address.state}, {address.country} - {address.pinCode}
                  </p>
                </div>
                <div className="second-address-nav">
                  <i
                    className="bx bx-trash"
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    onClick={() => handleDelete(index)}
                  ></i>
                  <i
                    className="bx bx-edit"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(index)}
                  ></i>
                </div>
              </div>
            ))}

            <div className="add-address">
              <i
                className="bx bx-plus-circle"
                style={{ cursor: "pointer" }}
                onClick={handleAdd}
              ></i>
            </div>
          </div>
          <div className="slot-side">
            <h2 style={{ color: "black" }}>Select Slot</h2>
            <div className="add-slot">
              <div className="slot-dropdown">
                <p>Delivery slot:</p>
                <span>30 May, 11:20am</span>
              </div>
            </div>
            <button className="slot-button"><Link to="/paymentcheckout" style={{color: 'white'}}>Proceed</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopCheckout;
