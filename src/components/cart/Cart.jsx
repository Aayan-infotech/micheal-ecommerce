import React, { useEffect } from "react";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddedCarts());
  }, [dispatch]);

  const handleCartDelete = async (card_id) => {
    try {
      const response = await axios.delete(
        `https://ecom.atulrajput.tech/api/cart/delete/${card_id}`,
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
  };

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
                {allProducts.length > 0 ? (
                  <>
                    {allProducts.map((productItem, index) => (
                      <div className="cards" key={index}>
                        <div className="card-img">
                          <img
                            src={productItem?.product?.image || cartImg}
                            alt={productItem?.product?.name}
                          />
                        </div>
                        <div className="card-text">
                          <div className="c-text">
                            <h2>{productItem?.product?.name}</h2>
                            <p>{productItem?.product?.description}</p>
                            <p>${productItem?.product?.price}</p>
                            <p>Quantity: {productItem?.quantity}</p>
                          </div>
                        </div>
                        <i
                          className="bx bx-x"
                          onClick={() =>
                            handleCartDelete(productItem?.product?._id)
                          }
                        ></i>
                      </div>
                    ))}
                    <div className="card-text" style={{ textAlign: "center", marginTop: "20px" }}>
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

