import React, { useState, useEffect } from "react";
import "./beautyproduct.css";
import bannerImg from "../../images/beautyprodust-second.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/addToCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Beautyproduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://ecom.atulrajput.tech/api/product/get/${productId}`
        );
        setProduct(response?.data?.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching product details");
        setLoading(false);
        console.error("Error fetching product details:", err);
      }
    };
    fetchProductDetails();
  }, [productId]);

  // Function to handle add to cart action
  const handleAddToCart = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      if (!userId) {
        toast.error("Please log in to add products to your cart.", {
          autoClose: 1000,
        });
        setBtnLoading(false);
        return;
      }
      if (product && product._id) {
        const response = await dispatch(
          addToCart({ userId, productId: product._id, quantity })
        );
        if (response?.payload?.success) {
          toast.success(
            response?.payload?.message || "Product Added Successfully!",
            {
              autoClose: 1000,
            }
          );
        } else {
          toast.error(
            response?.payload?.message || "Failed to add product to cart.",
            {
              autoClose: 1000,
            }
          );
        }
      } else {
        toast.error("Product details not available.", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        autoClose: 1000,
      });
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="beautyproductcarousel">
        <div className="section">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : product ? (
            <>
              <div className="cart-section">
                <div className="left-cart-sec">
                  <img src={product?.image || bannerImg} alt={product?.name} />
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
                    <p className="right-cart-info">
                      Available |{" "}
                      <span className="star-rating">
                        <i className="bx bxs-star"></i>
                        {product?.rating || "4.8 (1.2k)"}
                      </span>
                    </p>
                    <div className="right-cart-navi">
                      <button
                        className="right-cart-butt"
                        type="button"
                        onClick={handleAddToCart}
                        disabled={btnLoading}
                      >
                        {btnLoading ? "Adding..." : "Add To Cart"}
                      </button>
                    </div>
                  </div>
                  <h2 className="cart-head">Price: ${product?.price}</h2>
                </div>
              </div>
              {/* <div className="cart-about">
                                <h2 className="cart-head">{product?.name}</h2>
                                <p className="cart-about-summary">{product?.description}</p>
                            </div>
                            <div className="cart-links">
                                <h2 className="cart-head">Additional Information</h2>
                                <div className="cart-links-info">
                                    <p className="cart-links-first">
                                        Category: {product?.category}
                                    </p>
                                    <h2 className="cart-head">Subcategory: {product?.subcategory}</h2>
                                    <p className="cart-links-second">
                                        Stock: {product?.stock} available
                                    </p>
                                    <h2 className="cart-head">Price: ${product?.price}</h2>
                                </div>
                            </div> */}
            </>
          ) : (
            <div>No product found.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Beautyproduct;
