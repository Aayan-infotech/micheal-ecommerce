import React, { useState, useEffect } from "react";
import "./cart.css";
import { Link, useNavigate } from "react-router-dom";
import cartImg from "../../images/cart-img.jpg";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../loader/Loading';

function Cart() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCartsAdded();
  }, []);

  const fetchAllCartsAdded = async () => {
    try {
      const response = await axios.get("http://44.196.192.232:3129/api/cart/get", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setAllProducts(response?.data?.data?.products || []);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong", error);
      setLoading(false);
    }
  };

  const handleCartDelete = async (card_id) => {
    try {
      const response = await axios.delete(`http://44.196.192.232:3129/api/cart/delete/${card_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      fetchAllCartsAdded();
      toast.success(response?.data?.message, {
        autoClose: 2000
      });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const handleBuyNow = (productItem) => {
    navigate("/shoppingbag", { state: { productItem } });
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
            {loading ? (
              <Loading />
            ) : (
              <>
                {allProducts.length > 0 ? (
                  allProducts?.map((productItem, index) => (
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
                        {/* <Link
                      to="/shoppingbag"
                      state={{ productItem }}
                    > */}
                        <button onClick={() => handleBuyNow(productItem)}>Buy Now</button>
                        {/* </Link> */}

                      </div>
                      <i
                        className="bx bx-x"
                        onClick={() => handleCartDelete(productItem?.product?._id)}
                      ></i>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: "25px", color: "white", fontWeight: "bold" }}>No products in the cart.</p>
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
