import React from "react";
import "./notification.css";
import { Link } from "react-router-dom";
import notificationImg from "../../images/cart-img.jpg";

function Notification() {
  return (
    <div className="notification">
      <div className="notification-container">
        <div className="notification-banner">
          <h1>All Notifications</h1>
        </div>

        <div className="card-notification container">
          <div className="cards">
            <div className="card-img">
              <img src={notificationImg} alt="Product" />
            </div>
            <div className="card-text">
              <div className="c-text">
                <h2>"Trendy Styles at Never Before Discounts!Bata, Red Tape, Provogue & more! Don't wait, get shopping"</h2>
                <p>10 Sep, 2024</p>
              </div>
            </div>
          </div>

          <div className="cards">
            <div className="card-img">
              <img src={notificationImg} alt="Product" />
            </div>
            <div className="card-text">
              <div className="c-text">
                <h2>"Trendy Styles at Never Before Discounts!Bata, Red Tape, Provogue & more! Don't wait, get shopping"</h2>
                <p>10 Sep, 2024</p>
              </div>
            </div>
          </div>

          <div className="cards">
            <div className="card-img">
              <img src={notificationImg} alt="Product" />
            </div>
            <div className="card-text">
              <div className="c-text">
                <h2>"Trendy Styles at Never Before Discounts!Bata, Red Tape, Provogue & more! Don't wait, get shopping"</h2>
                <p>10 Sep, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;