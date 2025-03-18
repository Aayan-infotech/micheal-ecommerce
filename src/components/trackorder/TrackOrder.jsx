import React, { useState, useEffect } from 'react';
import trackImg from "../../images/first-pay.png";
import './trackorder.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/loader/Loading';

function TrackOrder() {
  const [trackOrder, setTrackOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrackOrder();
  }, [orderId]);

  const fetchTrackOrder = async () => {
    try {
      const response = await axios.get(`https://ecom.atulrajput.tech/api/product/order-details/${orderId}`);
      setTrackOrder(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      const response = await axios.post(`https://ecom.atulrajput.tech/api/product/cancel/${orderId}`);

      if (response?.data?.success) {
        toast.success("Order canceled successfully!");
        fetchTrackOrder();
      } else {
        toast.error("Failed to cancel order.");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while canceling the order.");
    }
  };

  return (
    <div className="trackorder">
      <div className="trackorder-container">
        <div className="trackorder-banner">
          <h1>Track Order</h1>
        </div>

        {trackOrder ? (
          <div className="order-details container">
            <div className="order-img">
              <img src={trackOrder?.items[0]?.product?.image || trackImg} alt={trackOrder?.items[0]?.product?.name} />
            </div>
            <div className="order-info">
              <h2>{trackOrder?.items[0]?.product?.name}</h2>
              <h5 style={{ fontWeight: "none" }}>Quantity: <span>{trackOrder?.items[0]?.quantity}</span></h5>
              <h5 style={{ fontWeight: "none" }}>Price: <span>$ {trackOrder?.totalAmount.toFixed(2)}</span></h5>
              <h4>Time Period: <span>{trackOrder?.deliverySlot?.timePeriod}</span></h4>
              <p style={{
                color: trackOrder?.orderStatus === "Pending" || trackOrder?.orderStatus === "Cancelled" ? "red"
                  : trackOrder?.orderStatus === "Approved" ? "green"
                    : "black",
                fontWeight: "bold",
              }}>
                {trackOrder?.orderStatus}
              </p>
            </div>
            <div className="order-actions">
              {trackOrder?.orderStatus === 'Pending' &&
                <button className="cancel-order" onClick={handleCancelOrder}>
                  <i className='bx bx-x-circle'></i> Cancel Order
                </button>
              }
              <button className="chat-with-us">
                <i className='bx bx-conversation'></i> Chat with Us
              </button>
            </div>
          </div>
        ) : (
          <p className='container order-para'>Loading order details...</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default TrackOrder;
