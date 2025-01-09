import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./storeBeautyProd.css";

function StoreBeautyProd() {
  const [product, setProduct] = useState({});

  const storeProducts = JSON.parse(sessionStorage.getItem("selectProduct"));
  // console.log(storeProducts._id);

  useEffect(() => {
    const fetchProd = async () => {
      try {
        const response = await fetch(
          `https://www.millysshop.se/api/product/get/${storeProducts._id}`
        );
        const data = await response.json();
        console.log(data?.data, 'particular product')
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProd();
  }, []);

  return (
    <div className="storeBeautyProd">
      <div className="container section">
          {product && product.name ? (
            <div className="cart-section1">
              <div className="left-cart-sec">
                <img src={product.image} alt="" />
              </div>
              <div className="right-cart-sec">
                <h2 className="cart-head">{product.name}</h2>
                <p className="right-cart-para">{product.description}</p>
                <div className="right-cart-credential">
                  <div className="right-cart-data">
                    <p className="right-cart-info3">
                      Price: <span>{product.price}</span>
                    </p>
                    <p className="right-cart-info4">
                      Quantity: <span>{product.stock}</span>
                    </p>
                  </div>
                  <div className="right-cart-navi">
                    <Link to="/cart" className="logo">
                      <button className="right-cart-butt1" type="button">
                        Buy
                      </button>
                    </Link>
                    <p className="heart-icon1">
                      <i className="bx bx-heart"></i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
          <p>Product Details not Present</p>
        )}
        <div className="cart-about">
          <h2 className="cart-head">Lorem Ipsum</h2>
          <p className="cart-about-summary">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry.
          </p>
        </div>
        <div className="cart-links">
          <h2 className="cart-head">Lorem Ipsum</h2>
          <div className="cart-links-info">
            <p className="cart-links-first">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum is simply dummy text of the
              printing and typesetting industry.
            </p>
            <h2 className="cart-head">Pixcel : Licenses</h2>
            <p className="cart-links-second">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum is simply dummy text of the
              printing and typesetting industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreBeautyProd;
