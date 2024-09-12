import React from "react";
import "./myorder.css";
import { Link } from "react-router-dom";
import firstImg from "../../images/first-pay.png"
import cartImg from "../../images/cart-img.jpg";

function MyOrders() {
  return (
    <div className="myorder">
      <div className="myorders-container">
        <div className="myorders-banner">
          <h1>My Orders</h1>
        </div>

        <div className="myorders-cart container">
          <div className="myorders">
            <Link to="/trackorder">
              <div className="myOrders-first">
                <div className="myOrder-inner">
                  <div className="myorders-img">
                    <img src={cartImg} alt="Product" />
                  </div>
                  <div className="myorders-text">
                    <div className="c-text">
                      <h2 className="order-head">Lorem Ipsum</h2>
                      <p>Quantity: <span>2</span></p>
                    </div>
                  </div>
                </div>

                <div className="orders-price">
                  <h2 className="order-head">$90.4</h2>
                </div>

                <div className="order-summarys">
                  <h2 style={{ color: "black", fontWeight: 500 }}>Delivery expected by Thu Aug 29</h2>
                  <p>Your Order has been placed.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="myorders">
            <Link to="/trackorder">
              <div className="myOrders-first">
                <div className="myOrder-inner">
                  <div className="myorders-img">
                    <img src={cartImg} alt="Product" />
                  </div>
                  <div className="myorders-text">
                    <div className="c-text">
                      <h2 className="order-head">Lorem Ipsum</h2>
                      <p>Quantity: <span>2</span></p>
                    </div>
                  </div>
                </div>

                <div className="orders-price">
                  <h2 className="order-head">$90.4</h2>
                </div>

                <div className="order-summarys">
                  <h2 style={{ color: "black", fontWeight: 500 }}>Delivery expected by Thu Aug 29</h2>
                  <p>Your Order has been placed.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="myorders">
            <Link to="/trackorder">
              <div className="myOrders-first">
                <div className="myOrder-inner">
                  <div className="myorders-img">
                    <img src={cartImg} alt="Product" />
                  </div>
                  <div className="myorders-text">
                    <div className="c-text">
                      <h2 className="order-head">Lorem Ipsum</h2>
                      <p>Quantity: <span>2</span></p>
                    </div>
                  </div>
                </div>

                <div className="orders-price">
                  <h2 className="order-head">$90.4</h2>
                </div>

                <div className="order-summarys">
                  <h2 style={{ color: "black", fontWeight: 500 }}>Delivery expected by Thu Aug 29</h2>
                  <p>Your Order has been placed.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
