import React, { useEffect, useState } from "react";
import "./payment.css";
import firstPay from "../../images/first-pay.png"; // Visa
import secondPay from "../../images/second-pay.png"; // PayPal
import thirdPay from "../../images/third-pay.png"; // MasterCard
import fourthPay from "../../images/fourth-pay.png"; // Apple Pay
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    { id: 1, name: "Visa", img: firstPay, lastFour: "2109" },
    { id: 2, name: "PayPal", img: secondPay, lastFour: "2109" },
    { id: 3, name: "MasterCard", img: thirdPay, lastFour: "2109" },
    { id: 4, name: "Apple Pay", img: fourthPay, lastFour: "2109" },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSlot, addressId, productItem } = location.state || {};

  useEffect(() => {
    if (selectedSlot) {
      console.log('Selected Address ID:', selectedSlot);
    }
  }, [selectedSlot]);

  const handleMethodSelect = (id) => {
    setSelectedMethod(id);
  };

  const totalProductPrice = productItem?.product?.price + selectedSlot?.deliveryCharge;

  const handleToProceedCheckout = async (token) => {
    try {
      const response = await axios.post(
        'http://44.196.192.232:3129/api/payment/create-payment-intent',
        {
          provider: 'stripe',
          amount: totalProductPrice,
          currency: 'auto',
          token: token.id,
          // productId:productItem?.product?._id
          // addressId: addressId
        }
      );
      console.log(response?.data?.data);
      navigate("/order-summary");
    } catch (error) {
      console.log("Error during payment process:", error);
    }
  };

  return (
    <div className="payment">
      <div className="payment-container">
        <div className="payment-banner">
          <h1>Payment</h1>
        </div>

        <div className="pay-methods container">
          <div className="payment-methods">
            <h2 style={{ color: "black", fontWeight: "500" }}>Payment</h2>

            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`payment-option ${selectedMethod === method.id ? 'selected' : ''}`}
                onClick={() => handleMethodSelect(method.id)}
              >
                <img src={method.img} alt={method.name} />
                <span>************{method.lastFour}</span>
              </div>
            ))}
          </div>

          <div className="payment-summary">
            <div className="orders-summary">
              <div className="order-item">
                <span>Total Price</span>
                <span>$ {productItem?.product?.price}</span>
              </div>
              <div className="order-item">
                <span>Delivery Charge</span>
                <span>$ {selectedSlot?.deliveryCharge}</span>
              </div>
              <div className="order-item">
                <span>Delivery Type</span>
                <span>{selectedSlot?.deliveryType}</span>
              </div>
              <div className="order-item" style={{ fontWeight: "bold", fontSize: "25px", color: "black" }}>
                <span>Total</span>
                <span>$ {totalProductPrice}</span>
              </div>
            </div>

            <div className="payment-buttons">
              {selectedMethod === 1 ? (
                <StripeCheckout
                  name="MILLYS HB"
                  image="http://localhost:3000/static/media/logo.22c2717f079a705976f8.png"
                  ComponentClass="div"
                  amount={totalProductPrice * 100}
                  currency="USD"
                  stripeKey="pk_test_51PqTR903ec58RCFWng6UUUnIZ8R0PmQZL1xVE5Wv6jUIAiS9dxzWobfK6oysU86LJmkvd9I2Adcbbv0jYqLkNcAp00hFGx4UKj"
                  locale="en"
                  zipCode={false}
                  token={handleToProceedCheckout}
                >
                  <button className="slot-button">
                    Proceed To Payment
                  </button>
                </StripeCheckout>
              ) : selectedMethod === 2 ? (
                <PayPalScriptProvider options={{ clientId: "test" }}>
                  <PayPalButtons style={{ layout: "horizontal" }} />
                </PayPalScriptProvider>
              ) : selectedMethod === 3 ? (
                <button onClick={() => alert('Processing payment with MasterCard')}>Pay with MasterCard</button>
              ) : selectedMethod === 4 ? (
                <button onClick={() => alert('Processing payment with Apple Pay')}>Pay with Apple Pay</button>
              ) : (
                <button disabled>Select a payment method</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
