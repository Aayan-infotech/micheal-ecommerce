import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./myorder.css";
import { useNavigate } from "react-router-dom";
import cartImg from "../../images/cart-img.jpg";
import Loading from "../../components/loader/Loading";

function MyOrders() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          `https://ecom.atulrajput.tech/api/product/order-history/${userId}`
        );
        console.log(response?.data?.data, "abinash");
        if (response.data.success) {
          setOrderHistory(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [userId]);

  const handleTrackOrder = (order) => {
    navigate(`/trackorder/${order._id}`);
  };

  return (
    <div className="myorder">
      <div className="myorders-container">
        <div className="myorders-banner">
          <h1>My Orders</h1>
        </div>

        <div className="myorders-cart container">
          {loading ? (
            <Loading />
          ) : orderHistory.length === 0 ? (
            <p>No order history available.</p>
          ) : (
            orderHistory.map((order, index) => (
              <div className="myorders" key={index}>
                <div
                  onClick={() => handleTrackOrder(order)}
                  className="order-history-cart"
                >
                  <div className="myOrders-first">
                    <div className="myOrder-inner">
                      <div className="myorders-img">
                        <img
                          src={order?.items[0]?.product?.image}
                          alt={order?.items[0]?.product?.name || cartImg}
                        />
                      </div>

                      <div className="myorders-text">
                        <div className="c-text">
                          <h2 className="order-head">
                            {order.items[0].product.name}
                          </h2>
                          <p>
                            Quantity: <span>{order.items[0].quantity}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="orders-price">
                      <h2 className="order-head">
                        ${order?.totalAmount.toFixed(3)}
                      </h2>
                    </div>
                    <div className="order-summarys">
                      <h2 style={{ color: "black", fontWeight: 500 }}>
                        {" "}
                        Delivery expected by{" "}
                      </h2>
                      <h5 style={{ color: "black", fontWeight: 500 }}>
                        {order?.deliverySlot?.date} <br/> {order?.deliverySlot?.timePeriod}
                      </h5>
                      <p
                        style={{
                          color:
                            order.orderStatus === "Pending" ||
                            order.orderStatus === "Cancelled"
                              ? "red"
                              : order.orderStatus === "Approved"
                              ? "green"
                              : "black",
                          fontWeight: "bold",
                        }}
                      >
                        {order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
