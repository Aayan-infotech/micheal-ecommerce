import React, { useState, useEffect } from "react";
import "./cart.css";
import { Link } from "react-router-dom";
import cartImg from "../../images/cart-img.jpg";
import axios from "axios";

function Cart() {
  const [allProducts, setAllProducts] = useState([]);

  const userId = sessionStorage.getItem('userId');
  const token= sessionStorage.getItem('token');

  useEffect(() => {
    fetchAllProducts();
  }, []);


  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('http://3.111.163.2:3129/api/product/getall');
      setAllProducts(response?.data?.data)
    } catch (error) {
      console.log('something went wrong', error)
    }
  }

  const handleCartDelete = async () => {
    try {
      const response = await axios.get('http://3.111.163.2:3129/api/cart/delete');
    } catch (error) {
      console.log('something went wrong');
    }
  }

  useEffect(() => {
    fetchCartItems();
  }, []); 

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://3.111.163.2:3129/api/cart/get');
      console.log(response?.data, '----------')
      // setCartItems(response?.data?.data || []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };



  return (
    <div className="cart">
      <div className="cart-container">
        <div className="cart-banner">
          <h1>Cart</h1>
        </div>

        <div className="card-cart container">
          {allProducts.map((product) => (
            <div className="cards" key={product?._id}>
              <div className="card-img">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="card-text">
                <div className="c-text">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                </div>
                <Link to="/shoppingbag">
                  <button>Buy Now</button>
                </Link>
              </div>
              <i className="bx bx-x" onClick={() => handleCartDelete(product?._id)}></i>
            </div>
          ))}

          {/* <div className="cards">
            <div className="card-img">
              <img src={cartImg} alt="Product" />
            </div>
            <div className="card-text">
              <div className="c-text">
                <h2>Lorem Ipsum</h2>
                <p>500 ml</p>
              </div>
              <Link to="/shoppingbag">
                <button>Buy Now</button>
              </Link>
            </div>
            <i class="bx bx-x"></i>
          </div> */}

          {/* <div className="cards">
            <div className="card-img">
              <img src={cartImg} alt="Product" />
            </div>
            <div className="card-text">
              <div className="c-text">
                <h2>Lorem Ipsum</h2>
                <p>500 ml</p>
              </div>
              <Link to="/shoppingbag">
                <button>Buy Now</button>
              </Link>
            </div>
            <i class="bx bx-x"></i>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Cart;
