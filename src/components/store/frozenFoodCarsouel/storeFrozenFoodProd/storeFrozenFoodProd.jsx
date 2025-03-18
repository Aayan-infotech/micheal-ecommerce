import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./storeFrozenFoodProd.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addToCart from "../../../redux/addToCart";
import { useDispatch } from "react-redux";

function StoreFrozenFoodProd() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { storeProId } = useParams();
  const dispatch = useDispatch();
  const [btnLoading, setBtnLoading] = useState(false);
  const userId = sessionStorage.getItem("userId");

  const fetchProd = async () => {
    try {
      const response = await axios.get(
        `http://54.236.98.193:3129/api/product/get/${storeProId}`
      );
      setProduct(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProd();
  }, []);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      if (!userId) {
        let localCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = localCart.findIndex(
          (item) => item.productId === product._id
        );

        if (existingProductIndex !== -1) {
          localCart[existingProductIndex].quantity += quantity;
        } else {
          localCart.push({
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image,
          });
        }
        localStorage.setItem("cart", JSON.stringify(localCart));
        toast.success("Added to cart (Saved Locally)", { autoClose: 1000 });
        setTimeout(() => {
          setBtnLoading(false);
          window.location.reload();
        }, 500);
        return;
      }

      if (product && product._id) {
        const response = await axios.post(
          "http://54.236.98.193:3129/api/cart/add",
          {
            userId,
            productId: product._id,
            quantity,
          }
        );

        if (response.data.success) {
          toast.success(
            response.data.message || "Product Added Successfully!",
            {
              autoClose: 1000,
            }
          );
        } else {
          toast.error(
            response.data.message || "Failed to add product to cart.",
            {
              autoClose: 1000,
            }
          );
        }
      } else {
        toast.error("Product details not available.", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { autoClose: 1000 });
    }
    setBtnLoading(false);
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
                {product?.discount > 0 && (
                  <p className="left-cart-para">
                    {product?.discount}% off your order
                  </p>
                )}
              </div>
              <div className="right-cart-sec">
                <h2 className="cart-head">{product?.name}</h2>
                <p className="right-cart-para">{product?.description}</p>
                <div className="right-cart-credential">
                  <div className="right-cart-data">
                    <p className="right-cart-info">
                      Available |{" "}
                      <span className="star-rating">
                        <i className="bx bxs-star"></i>
                        {product?.rating || "4.8 (1.2k)"}
                      </span>
                    </p>
                  </div>
                  <div className="right-cart-navi">
                    <button
                      className="right-cart-butt"
                      type="button"
                      onClick={handleAddToCart}
                      disabled={btnLoading}
                    >
                      {btnLoading ? (
                        <i className="bx bx-loader bx-spin"></i>
                      ) : (
                        "Add To Cart"
                      )}
                    </button>
                  </div>
                </div>
                <h2 className="cart-head">Price: ${product?.price}</h2>
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
