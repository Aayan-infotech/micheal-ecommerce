import React, { useEffect, useState } from "react";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import cartImg from "../../images/cart-img.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../loader/Loading";
import { getAddedCarts } from "../redux/allAddedCartsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Cart() {
  const {
    items: allProducts,
    status,
    error,
  } = useSelector((state) => state.cart);
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  const [localCart, setLocalCart] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getAddedCarts());
    } else {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setLocalCart(storedCart);
    }
  }, [dispatch, userId]);

  const handleCartDelete = async (card_id) => {
    if (userId) {
      try {
        const response = await axios.delete(
          `http://54.236.98.193:3129/api/cart/delete/${card_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(getAddedCarts());
        toast.success(response?.data?.message, {
          autoClose: 2000,
        });
      } catch (error) {
        console.log(error, "error");
      }
    } else {
      const updatedCart = localCart.filter(
        (item) => item.productId !== card_id
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setLocalCart(updatedCart);
      window.location.reload();
      toast.success("Item removed from cart", { autoClose: 1000 });
    }
  };

  const cartItems = userId ? allProducts : localCart;
  // const totalPrice = cartItems.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );

  const handleBuyNow = (productItem = null) => {
    if (productItem) {
      navigate("/shoppingbag", { state: { productItem } });
    } else {
      navigate("/shoppingbag", { state: { productItems: allProducts } });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="cart">
        <div className="cart-container">
          <div className="cart-banner">
            <h1>Cart</h1>
          </div>

          <div className="card-cart container">
            {status === "loading" ? (
              <Loading />
            ) : status === "failed" ? (
              <p
                style={{ fontSize: "25px", color: "white", fontWeight: "bold" }}
              >
                {error}
              </p>
            ) : (
              <>
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((productItem, index) => (
                      <div className="cards" key={index}>
                        <div className="card-img">
                          <img
                            src={
                              productItem?.image ||
                              productItem?.product?.image ||
                              cartImg
                            }
                            alt={
                              productItem?.name || productItem?.product?.name
                            }
                            onError={(e) => (e.target.src = cartImg)}
                          />
                        </div>
                        <div className="card-text">
                          <div className="c-text">
                            <h2>
                              {productItem?.name || productItem?.product?.name}
                            </h2>
                            <p>
                              {productItem?.description ||
                                productItem?.product?.description}
                            </p>
                            <p>
                              $
                              {productItem?.price ||
                                productItem?.product?.price}
                            </p>
                            <p>Quantity: {productItem?.quantity}</p>
                          </div>
                        </div>
                        <i
                          className="bx bx-x"
                          onClick={() =>
                            handleCartDelete(
                              productItem?.productId ||
                                productItem?.product?._id
                            )
                          }
                        ></i>
                      </div>
                    ))}
                    <div
                      className="card-text"
                      style={{ textAlign: "center", marginTop: "20px" }}
                    >
                      <button onClick={() => handleBuyNow()}>Buy All</button>
                    </div>
                  </>
                ) : (
                  <p
                    style={{
                      fontSize: "25px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    No products in the cart.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
