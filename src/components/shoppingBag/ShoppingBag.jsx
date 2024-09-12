import React, { useState } from "react";
import "./shoppingbag.css";
import shoppingImg from "../../images/shopping-first.jpg";
import { Link } from 'react-router-dom';

function ShoppingBag() {
    const [text, setText] = useState(0); 

    function increFunc() {
        setText(text + 1);
    }

    function decreFunc() {
        if (text > 0) {
            setText(text - 1);
        }
    }

    return (
        <div className="shoppingbag">
            <div className="shoppingbag-container">
                <div className="shoppingbag-banner">
                    <h1>Shopping Bag</h1>
                </div>
            </div>
            <div className="shopping-cards container section">
                <div className="shopping-card-first">
                    <div className="shopping-first-img">
                        <p style={{ color: 'black', fontSize: '1.1rem', marginBottom: '10px' }}>Snacks Food</p>
                        <img src={shoppingImg} alt="" />
                    </div>
                    <div className="shopping-first-text">
                        <h5>lorem ipsum</h5>
                        <p>$2499</p>
                        <div className="shopping-pricing">
                            <button>$21</button>
                            <button onClick={increFunc}>+</button><span>{text}</span><button onClick={decreFunc}>-</button>
                        </div>
                    </div>
                </div>
                <div className="shopping-card-second">
                    <div className="shopping-pricing-total">
                        <div className="shopping-items">
                            <p>Your Bag</p>
                            <p>Subtotal (3 Items):</p>
                        </div>
                        <h5>$94</h5>
                    </div> 
                    <button type="submit"><Link to="/shopcheckout" className="checkout">Checkout</Link></button>
                </div>
            </div>
        </div>
    );
}

export default ShoppingBag;
