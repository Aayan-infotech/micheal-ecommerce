import React, { useState, useEffect } from 'react';
import trackImg from "../../images/first-pay.png"
import './trackorder.css';

function TrackOrder() {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setOrderData({
        image: trackImg,
        name: 'boAt Immortal 161',
        quantity: 1,
        price: '₹904',
        status: 'Pending',
      });
    }, 1000);
  }, []);

  return (
    <div className="trackorder">
      <div className="trackorder-container">
        <div className="trackorder-banner">
          <h1>Track Order</h1>
        </div>

        {orderData ? (
          <div className="order-details container">
            <div className="order-img">
              <img src={orderData.image} alt={orderData.name} />
            </div>
            <div className="order-info">
              <h2>{orderData.name}</h2>
              <p>Quantity: <span>{orderData.quantity}</span></p>
              <p>Price: <span>{orderData.price}</span></p>
              <p>Status: <span>{orderData.status}</span></p>
            </div>
            <div className="order-actions">
              <button className="cancel-order"><i className='bx bx-x-circle'></i> Cancel Order</button>
              <button className="chat-with-us"><i className='bx bx-conversation'></i> Chat with Us</button>
            </div>
          </div>
        ) : (
          <p className='container order-para'>Loading order details...</p>
        )}
      </div>
    </div>
  );
}

export default TrackOrder;
