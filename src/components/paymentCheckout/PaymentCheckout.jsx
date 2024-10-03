import React, { useState } from "react";
import "./paymentcheckout.css";
import { Link } from "react-router-dom";

function PaymentCheckout() {
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [totalAmount, setTotalAmount] = useState(108); // Initial total: $94 bag + $2 delivery + $12 tax
  const [savings, setSavings] = useState(0); // Initial savings: $0

  const bagValue = 94;
  const deliveryCharges = 2;
  const tax = 12;
  const couponDiscount = 0.05; // 5% discount

  // Handle coupon application
  const applyCoupon = () => {
    if (!isCouponApplied) {
      const discount = totalAmount * couponDiscount;
      setSavings(discount.toFixed(2));
      setTotalAmount((totalAmount - discount).toFixed(2));
      setIsCouponApplied(true); // Coupon is now applied
    }
  };

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
                <h4 style={{ marginBottom: "10px" }}>${bagValue}</h4>
                <h4 style={{ marginBottom: "10px" }}>${deliveryCharges}</h4>
                <h4 style={{ marginBottom: "10px" }}>${tax}</h4>
              </div>
            </div>
            <p className="order-description">
              Lorem Ipsum is simply dummy text of the printing industry's
              standard dummy text ever since the 1500s.
            </p>
          </div>
          <div className="order-total">
            <div className="order-coupon">
              <div className="coupon-about">
                <i className="bx bxs-discount coupon-icon"></i>
                <div className="coupon-text">
                  <h2
                    style={{
                      color: isCouponApplied ? "gray" : "black",
                      textDecoration: isCouponApplied ? "line-through" : "none",
                    }}
                  >
                    Apply Voucher
                  </h2>
                  <p
                    style={{
                      color: isCouponApplied ? "gray" : "#ff0000",
                      fontWeight: "bold",
                    }}
                  >
                    1 available - 5%
                  </p>
                </div>
              </div>
              <div className="coupon-select">
                <button
                  className="select-button"
                  
                  onClick={applyCoupon}
                  disabled={isCouponApplied}
                  style={{
                    // textDecoration: isCouponApplied ? "line-through" : "none", 
                    color: isCouponApplied ? "gray" : "white", 
                    backgroundColor: isCouponApplied ? "#e0e0e0" : "red",
                    cursor: isCouponApplied ? "not-allowed" : "pointer",
                  }}
                >
                  {isCouponApplied ? "Coupon Applied" : "Apply Coupon"}
                </button>
              </div>
            </div>
            <div className="total-saving">
              <h3>Total Savings</h3>
              <h5>${savings}</h5>
            </div>
            <div className="order-total-price">
              <h2 style={{ color: "black" }}>Total Amount Payable</h2>
              <h2 style={{ color: "black" }}>${totalAmount}</h2>
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
