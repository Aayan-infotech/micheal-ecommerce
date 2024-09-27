import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./shopcheckout.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StripeCheckout from 'react-stripe-checkout';

function ShopCheckout() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [deliverySlots, setDeliverySlots] = useState([]);
  const [selectedDeliveryType, setSelectedDeliveryType] = useState('');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchAddressDetails();
    fetchDeliverySlots();
  }, []);

  const fetchAddressDetails = async () => {
    try {
      const response = await axios.get(`http://44.196.192.232:3129/api/address/get/${userId}`);
      setAddresses(response.data.data);
    } catch (err) {
      console.error('Error fetching address details:', err);
    }
  };

  const fetchDeliverySlots = async () => {
    try {
      const response = await axios.get(`http://44.196.192.232:3129/api/deliveryslot/get`);
      setDeliverySlots(response.data.data);
    } catch (err) {
      console.error('Error fetching delivery slots:', err);
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
      const response = await axios.delete(`http://44.196.192.232:3129/api/address/delete/${add_id}`);
      if (response.data.success) {
        toast.success(response?.data?.message, {
          autoClose: 1500,
        });
        const deleteAddresses = addresses.filter(address => address._id !== add_id);
        setAddresses(deleteAddresses);
        fetchAddressDetails();
      } else {
        toast.error('Failed to delete address', {
          autoClose: 1000,
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

  const handleDeliveryTypeChange = (event) => {
    setSelectedDeliveryType(event.target.value);
    setSelectedTimePeriod('');
  };

  // const handleToProceedCheckout = () => {
  //   const selectedSlot = deliverySlots.find(slot => slot?.deliveryType === selectedDeliveryType && slot?.timePeriod === selectedTimePeriod);
  //   const deliverySlotId = selectedSlot ? selectedSlot?._id : null;
  //   navigate("/paymentcheckout", { state: { deliverySlotId, addressId: selectedAddressId } });
  // }

  const handleToProceedCheckout = async (token) => {
    try {
      const response = await axios.post(
        'http://44.196.192.232:3129/api/payment/create-payment-intent',
        {
          provider: 'stripe',
          amount: 100, 
          currency: 'inr',
          token: token.id, 
        }
      );
      console.log(response?.data?.data);  
      navigate("/paymentcheckout");
    } catch (error) {
      console.log("Error during payment process:", error);
    }
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
                    <h3 style={{ color: "black", marginBottom: "10px", borderRadius: "10px" }}>
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
                  <p>Select Delivery Type:</p>
                  <select value={selectedDeliveryType} onChange={handleDeliveryTypeChange} style={{ padding: "10px", borderRadius: "10px" }}>
                    <option value="">Select Delivery Type</option>
                    {deliverySlots.map(slot => (
                      <option key={slot._id} value={slot.deliveryType}>{slot.deliveryType}</option>
                    ))}
                  </select>
                </div>
                {selectedDeliveryType && (
                  <div className="time-periods">
                    <p>Select Time Period:</p>
                    {deliverySlots.filter(slot => slot.deliveryType === selectedDeliveryType).map(slot => (
                      <div key={slot._id} style={{ padding: "8px" }}>
                        <label>
                          <input
                            type="radio"
                            value={slot.timePeriod}
                            checked={selectedTimePeriod === slot.timePeriod}
                            onChange={() => setSelectedTimePeriod(slot.timePeriod)}
                          />
                          {slot.timePeriod}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* <button onClick={handleToProceedCheckout} className="slot-button" disabled={!selectedAddressId || !selectedTimePeriod}>
                Proceed To Payment
              </button> */}
              <StripeCheckout
                name="MILLYS HB"
                image="http://localhost:3000/static/media/logo.22c2717f079a705976f8.png"
                ComponentClass="div"
                amount={1000000}  // amount in the lowest currency unit (like paise for INR)
                currency="USD"    // make sure this matches your payment data
                stripeKey="pk_test_51PqTR903ec58RCFWng6UUUnIZ8R0PmQZL1xVE5Wv6jUIAiS9dxzWobfK6oysU86LJmkvd9I2Adcbbv0jYqLkNcAp00hFGx4UKj"
                locale="IN"
                shippingAddress
                billingAddress={false}
                zipCode={false}
                token={handleToProceedCheckout}  // this function will be called after successful token creation
              >
                <button className="slot-button" disabled={!selectedAddressId || !selectedTimePeriod}>
                  Proceed To Payment
                </button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopCheckout;
