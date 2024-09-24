import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./shopcheckout.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShopCheckout() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null); // State to store the selected address ID
  const location = useLocation();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchAddressDetails();
  }, []);

  const fetchAddressDetails = async () => {
    try {
      const response = await axios.get(`http://3.111.163.2:3129/api/address/get/${userId}`);
      setAddresses(response.data.data);
    } catch (err) {
      console.error('Error fetching product details:', err);
    }
  };

  const handleEdit = (index) => {
    navigate("/address", {
      state: { address: addresses[index], index, allAddresses: addresses },
    });
  };

  const handleAdd = () => {
    navigate("/address", { state: { allAddresses: addresses } });
  };

  const handleDelete = async (add_id) => {
    try {
      const response = await axios.delete(`http://3.111.163.2:3129/api/address/delete/${add_id}`);
      if (response.data.success) {
        toast.success(response?.data?.message, {
          autoClose: 1500,
        });
        const deleteAddresses = addresses.filter(address => address._id !== add_id);
        setAddresses(deleteAddresses);
        fetchAddressDetails();
        // navigate("/shopcheckout", { state: { addresses: deleteAddresses } });
      } else {
        toast.error('Failed to delete address', {
          autoClose: 1500,
        });
      }
    } catch (error) {
      toast.error('Error deleting address', {
        autoClose: 1500,
      });
    }
  };

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };

  return (
    <>
      <ToastContainer />
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
                      onClick={() => handleDelete(address?._id)}
                    ></i>
                    <i
                      className="bx bx-edit"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEdit(index)}
                    ></i>
                  </div>

                  {/* Check icon for selected address */}
                  <i
                    className={`bx ${selectedAddressId === address._id ? "bxs-check-circle" : "bx-check-circle"}`}
                    style={{ fontSize: '25px', color: selectedAddressId === address._id ? "green" : "gray", cursor: "pointer" }}
                    onClick={() => handleSelectAddress(address._id)}
                  ></i>
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
              <button className="slot-button">
                <Link
                  to="/paymentcheckout"
                  state={{ selectedAddressId }}
                  style={{ color: 'white' }}
                >
                  Proceed
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopCheckout;
