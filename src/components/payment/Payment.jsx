import React, { useEffect, useState } from "react";
import "./payment.css";
import firstPay from "../../images/first-pay.png";
import secondPay from "../../images/second-pay.png";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../loader/Loading";

function Payment() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(true);

  const paymentMethods = [
    { id: 1, name: "Visa", img: firstPay, lastFour: "2109" },
    { id: 2, name: "PayPal", img: secondPay, lastFour: "2109" },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSlot, addressId, getVoucher, totalAmount } =
    location.state || {};

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleMethodSelect = (id) => {
    setSelectedMethod(id);
  };

  const handleToProceedCheckout = async (token) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://54.236.98.193:3129/api/product/order",
        {
          userId: userId,
          deliverySlotId: selectedSlot?._id,
          addressId: addressId,
          paymentMethod: "stripe",
          token: token.id,
          voucherCode: getVoucher?.code,
        }
      );
      navigate("/paymentmessage");
    } catch (error) {
      console.log("Error during payment process:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      const response = await axios.post(
        "http://54.236.98.193:3129/api/paypal/create-payment",
        {
          id: details.id,
        }
      );
      if (response.data.success) {
        alert("Payment successful and verified!");
      } else {
        alert("Payment verification failed.");
      }
    } catch (error) {
      alert("An error occurred during the payment process. Please try again.");
    }
  };

  if (loading) {
    return <Loading />;
  }

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
                className={`payment-option ${
                  selectedMethod === method.id ? "selected" : ""
                }`}
                onClick={() => handleMethodSelect(method.id)}
              >
                <img src={method.img} alt={method.name} />
                <span>************{method.lastFour}</span>
              </div>
            ))}
          </div>

          <div className="payment-summary">
            <div className="payment-buttons">
              {selectedMethod === 1 ? (
                <StripeCheckout
                  name="MILLYS HB"
                  image="http://localhost:3000/static/media/logo.22c2717f079a705976f8.png"
                  ComponentClass="div"
                  currency="USD"
                  stripeKey="pk_test_51PqTR903ec58RCFWng6UUUnIZ8R0PmQZL1xVE5Wv6jUIAiS9dxzWobfK6oysU86LJmkvd9I2Adcbbv0jYqLkNcAp00hFGx4UKj"
                  locale="en"
                  zipCode={false}
                  token={handleToProceedCheckout}
                >
                  <button className="slot-button">Proceed To Payment</button>
                </StripeCheckout>
              ) : selectedMethod === 2 ? (
                <PayPalScriptProvider
                // options={{
                //   clientId:
                //     "ARIN0VXEZukePCK2S-yeejyx-02RqIYg864DpeaxY0juKGp-yuXDXoVuHCiOiJshiwslRRENxWHJBp7V",
                //   intent: "sale",
                // }}
                >
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              currency_code: "USD",
                              value: "10.00",
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={handleApprove}
                    onError={(err) => {
                      console.error("PayPal error:", err);
                      alert("An error occurred with PayPal. Please try again.");
                    }}
                  />
                </PayPalScriptProvider>
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
