import React, { useState } from "react";
import "./payment.css";
import firstPay from "../../images/first-pay.png";
import secondPay from "../../images/second-pay.png";
import thirdPay from "../../images/third-pay.png";
import fourthPay from "../../images/fourth-pay.png";
import { Link } from "react-router-dom";

function Payment() {
  // const [selectOption, setSelectOption] = useState(null);

  // const handleOptionClick = (optionIndex) =>{
  //   setSelectOption(optionIndex);
  // }

  return (
    <div className="payment">
      <div className="payment-container">
        <div className="payment-banner">
          <h1>Payment</h1>
        </div>

        <div className="pay-methods container">
          <div className="payment-methods">
            <h2 style={{ color: "black", fontWeight: "500" }}>Payment</h2>
            <div className="payment-option selected">
              <img src={firstPay} alt="Visa" />
              <span>************2109</span>
            </div>
            <div className="payment-option">
              <img src={secondPay} alt="PayPal" />
              <span>************2109</span>
            </div>
            <div className="payment-option">
              <img src={thirdPay} alt="MasterCard" />
              <span>************2109</span>
            </div>
            <div className="payment-option">
              <img src={fourthPay} alt="Apple Pay" height="50px" />
              <span>************2109</span>
            </div>
          </div>

          <div className="payment-summary">
            <div className="orders-summary">
              <div className="order-item">
                <span>Order</span>
                <span>₹ 7,000</span>
              </div>
              <div className="order-item">
                <span>Shipping</span>
                <span>₹ 30</span>
              </div>
              <div className="order-item">
                <span>Total</span>
                <span>₹ 7,030</span>
              </div>
            </div>
            <div className="payment-buttons">
              <Link to="/paymentmessage">
                <button>Pay</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
