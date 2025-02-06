import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./storeFrozenFoodProd.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import addToCart from "../../../redux/addToCart";
import { useDispatch } from "react-redux";

function StoreFrozenFoodProd() {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { storeProId } = useParams();
  const dispatch = useDispatch();
  const userId = sessionStorage.getItem("userId");

  const fetchProd = async () => {
    try {
      const response = await axios.get(
        `https://ecom.atulrajput.tech/api/product/get/${storeProId}`
      );
      setProduct(response?.data?.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProd();
  }, []);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) setQuantity(value);
};

const handleAddToCart = async () => {
  try {
    if (!userId) {
      toast.error('Please log in to add products to your cart.', {
        autoClose: 1000
      });
      return; 
    }
    if (product && product._id) {
      
      const response = await axios.post('https://ecom.atulrajput.tech/api/cart/add', {
        userId,
        productId: product._id,
        quantity
      });
      if (response.data.success) {
        toast.success(response.data.message || 'Product Added Successfully!', {
          autoClose: 1000
        });
      } else {
        toast.error(response.data.message || 'Failed to add product to cart.', {
          autoClose: 1000
        });
      }
    } else {
      toast.error('Product details not available.', {
        autoClose: 1000
      });
    }
  } catch (error) {
    toast.error('An error occurred. Please try again.', {
      autoClose: 1000
    });
  }
};


  return (
    <>
      <ToastContainer />
      <div className="storeFrozenFoodProd">
        <div className="container section">
          {product && product?.name ? (
            <div className="cart-section2">
              <div className="left-cart-sec">
                <img src={product?.image} alt={product?.name} />
              </div>
              <div className="right-cart-sec">
                <h2 className="cart-head">{product?.name}</h2>
                <p className="right-cart-para">{product?.description}</p>
                <div className="right-cart-credential">
                  <div className="right-cart-data">
                    <p className="right-cart-info1">
                      Price: $<span>{product?.price}</span>
                    </p>
                    {/* <p className="right-cart-info2">
                      Quantity: <span>{product?.stock}</span>
                    </p> */}
                  </div>
                  <div className="right-cart-navi">
                    <input
                      type="number"
                      value={quantity}
                      min="1"
                      onChange={handleQuantityChange}
                      className="quantity-input"
                    />
                    <button className="right-cart-butt" type='button' onClick={handleAddToCart}>
                      Add To Cart
                    </button>
                    <p className="heart-icon">
                      {product.isHighlight ? (
                        <i className='bx bxs-heart active-favorite'></i>
                      ) : (
                        <i className="bx bx-heart"></i>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Product Details not Present</p>
          )}
        </div>
      </div>
    </>
  );
}

export default StoreFrozenFoodProd;
