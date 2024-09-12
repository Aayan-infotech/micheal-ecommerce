import React from 'react';
import "./frozenfoodsCarousel.css";
import bannerImg from '../../images/Frozenfoods-first.png';
import { Link } from "react-router-dom";

function FrozenfoodsCarousel() {
  return (
    <div className="frozenfoodsCarousel">
        <div className="container section">
            <div className="cart-section">
                <div className="left-cart-sec">
                    <img src={bannerImg} alt="" />
                    <p className="left-cart-para">4% off your order</p>
                </div>
                <div className="right-cart-sec">
                    <h2 className="cart-head">Lorem Ipsum</h2>
                    <p className="right-cart-para">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <div className="right-cart-credential">
                        <p className="right-cart-info">
                            Available | <span className="star-rating"><i className="bx bxs-star"></i> 4.8 (1.2k)</span>
                        </p>
                        <div className="right-cart-navi">
                        <Link to="/cart" className="logo">
                            <button className="right-cart-butt" type='button'>Buy</button>
                        </Link>
                            <p className="heart-icon"><i className="bx bx-heart"></i></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cart-about">
                <h2 className="cart-head">Lorem Ipsum</h2>
                <p className="cart-about-summary">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div className="cart-links">
                <h2 className="cart-head">Lorem Ipsum</h2>
                <div className="cart-links-info">
                    <p className="cart-links-first">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <h2 className="cart-head">Pixcel : Licenses</h2>
                    <p className="cart-links-second">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default FrozenfoodsCarousel;
