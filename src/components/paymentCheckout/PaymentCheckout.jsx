import React, { useEffect } from "react";
import "./paymentcheckout.css";
import { Link } from "react-router-dom";

function PaymentCheckout() {

  return (
    <div className="paymentcheckout">
      <div className="paymentcheckout-container">
        <div className="paymentcheckout-banner">
          <h1>Checkout</h1>
        </div>
        <div className="order-summary container">
          <div className="order-detail">
            <h1 className="order-summary-title">Order Summary</h1>
            <div className="order-items">
              <div className="order-name">
                <h3
                  style={{
                    color: "black",
                    marginBottom: "10px",
                    fontWeight: 500,
                  }}
                >
                  Bag Value
                </h3>
                <h3
                  style={{
                    color: "black",
                    marginBottom: "10px",
                    fontWeight: 500,
                  }}
                >
                  Delivery Charges
                </h3>
                <h3
                  style={{
                    color: "black",
                    marginBottom: "10px",
                    fontWeight: 500,
                  }}
                >
                  Tax
                </h3>
              </div>
              <div className="order-price">
                <h4 style={{ marginBottom: "10px" }}>$94</h4>
                <h4 style={{ marginBottom: "10px" }}>$2</h4>
                <h4 style={{ marginBottom: "10px" }}>$12</h4>
              </div>
            </div>
            <p className="order-description">
              Lorem Ipsum is simply dummy text of the printing industry's
              standard dummy text ever since the 1500s, when an
            </p>
          </div>
          <div className="order-total">
            <div className="order-coupon">
              <div className="coupon-about">
                <i className="bx bxs-discount coupon-icon"></i>
                <div className="coupon-text">
                  <h2>Apply Voucher</h2>
                  <p>1 available</p>
                </div>
              </div>
              <div className="coupon-select">
                <button className="select-button">Select</button>
              </div>
            </div>
            <div className="order-total-price">
              <div className="total-price-name">
                <h2 style={{ color: "black" }}>Total Amount Payable</h2>
                <div className="total-saving">
                  <h3>Total Savings</h3>
                  <h5>$15</h5>
                </div>
              </div>
              <div className="order-amount">
                <h2 style={{ color: "black" }}>$103</h2>
              </div>
            </div>
          </div>
          <Link to="/payment">
            <button className="payment-button">Proceed to Payment</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentCheckout;
