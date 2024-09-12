import React from "react";
import "./cart.css";
import { Link } from "react-router-dom";
import cartImg from "../../images/cart-img.jpg";

function Cart() {
  return (
    <div className="cart">
      <div className="cart-container">
        <div className="cart-banner">
          <h1>Cart</h1>
        </div>

        <div className="card-cart container">
          <div className="cards">
            <div className="card-img">
              <img src={cartImg} alt="Product" />
            </div>
            <div className="card-text">
              <div className="c-text">
                <h2>Lorem Ipsum</h2>
                <p>500 ml</p>
              </div>
              <Link to="/shoppingbag">
                <button>Buy Now</button>
              </Link>
            </div>
            <i class="bx bx-x"></i>
          </div>

          <div className="cards">
            <div className="card-img">
              <img src={cartImg} alt="Product" />
            </div>
            <div className="card-text">
              <div className="c-text">
                <h2>Lorem Ipsum</h2>
                <p>500 ml</p>
              </div>
              <Link to="/shoppingbag">
                <button>Buy Now</button>
              </Link>
            </div>
            <i class="bx bx-x"></i>
          </div>

          <div className="cards">
            <div className="card-img">
              <img src={cartImg} alt="Product" />
            </div>
            <div className="card-text">
              <div className="c-text">
                <h2>Lorem Ipsum</h2>
                <p>500 ml</p>
              </div>
              <Link to="/shoppingbag">
                <button>Buy Now</button>
              </Link>
            </div>
            <i class="bx bx-x"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
