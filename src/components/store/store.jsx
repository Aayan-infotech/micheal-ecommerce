import React from "react";
import "./store.css";
import food from "../../images/frozen-store.jpg";
import products from "../../images/products-store.jpg";
import BeautyCarsouel from "../store/frozenFoodCarsouel/frozenFoodCarsouel";
import FoodCarsouel from "../store/beautyFoodCarsouel/beautyFoodCarsouel";
import { Link } from "react-router-dom";

function Store() {
  return (
    <div className="store">
      <div className="store-container">
        <div className="first-store">
          <h1>Stores</h1>
          <p className="store-para" style={{color: 'white'}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="container">
          <div className="second-store">
            <Link to="/dryfoods/frozenfoods">
              <div className="food-store">
                <div className="food-sec">
                  <img src={food} alt="" className="sec-store-img" />
                </div>
                <h2 className="frozen">Frozen Food Store</h2>
                <p>Edible</p>
              </div>
            </Link>
            <Link to="/cosmeticsproducts">
              <div className="products-store">
                <div className="products-sec">
                  <img src={products} alt="" className="sec-store-img" />
                </div>
                <h2>Beauty Products Store</h2>
                <p>Skincare</p>
              </div>
            </Link>
          </div>
        </div>
        <BeautyCarsouel/>
        <FoodCarsouel/>
      </div>
    </div>
  );
}

export default Store;
