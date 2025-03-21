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
          `http://3.223.253.106:3129/api/product/get/${productId}`
        );
        setProduct(response?.data?.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching product details");
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  // Function to handle add to cart action
  // const handleAddToCart = async (e) => {
  //   e.preventDefault();
  //   setBtnLoading(true);
  //   try {
  //     if (!userId) {
  //       toast.error("Please log in to add products to your cart.", {
  //         autoClose: 1000,
  //       });
  //       setBtnLoading(false);
  //       return;
  //     }
  //     if (product && product._id) {
  //       const response = await dispatch(
  //         addToCart({ userId, productId: product._id, quantity })
  //       );
  //       if (response?.payload?.success) {
  //         toast.success(
  //           response?.payload?.message || "Product Added Successfully!",
  //           {
  //             autoClose: 1000,
  //           }
  //         );
  //       } else {
  //         toast.error(
  //           response?.payload?.message || "Failed to add product to cart.",
  //           {
  //             autoClose: 1000,
  //           }
  //         );
  //       }
  //     } else {
  //       toast.error("Product details not available.", {
  //         autoClose: 1000,
  //       });
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred. Please try again.", {
  //       autoClose: 1000,
  //     });
  //   } finally {
  //     setBtnLoading(false);
  //   }
  // };

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
          "http://3.223.253.106:3129/api/cart/add",
          {
            userId,
            products: [{ productId: product._id, quantity: quantity }]
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
