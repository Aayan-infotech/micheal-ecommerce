import React from "react";
import "./paymentmessage.css";
import payImage from "../../images/payment-mess.svg"

function PaymentMessage() {
  return (
    <div className="paymentmessage">
      <div className="paymentmessage-container">
        <div className="container pay-message">
          <img src={payImage} alt="" />
          <h2 className="success">Successful</h2>
          <h2 className="message1">Your order has been recieved</h2>
          <h2 className="message2">Expected Delivery : June 19</h2>
          <button className="pay-button">Continue</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentMessage;
