import React, { useState } from "react";
import { Link } from "react-router-dom";
import cartImg from "../../images/cart-img.jpg";
import "./wishlist.css";

function Wishlist() {

  const [wishlists, setWishlists] = useState([
    {id: 1, name: "Lorem Ispum", price: "3.19", discount: "0% Off", rating: "4.8", image: cartImg},
    {id: 2, name: "Lorem Ispum", price: "2.39", discount: "0% Off", rating: "4.5", image: cartImg},
    {id: 3, name: "Lorem Ispum", price: "5.79", discount: "0% Off", rating: "4.8", image: cartImg}
  ]);

  const handleDelete = (id) => {
    const updateWishlists = wishlists.filter(item => item.id != id);
    setWishlists(updateWishlists);
  }

  return (
    <div className="wishlist">
      <div className="wishlist-container">
        <div className="wishlist-banner">
          <h1>Wishlist</h1>
        </div>

        <div className="wishlist-cart container">
          {wishlists.map((item) =>(
              <div className="wishlists" key={item.id}>
                <div className="wishlist-img">
                  <img src={item.image} alt="Product"/>
                </div>
                <div className="wishlist-text">
                  <div className="c-texts">
                    <h2>{item.name}</h2>
                    <p>{item.rating}<i class="bx bxs-star"></i></p>
                  </div>
                  <h3 style={{color: 'black'}}>{item.price} <span>{item.discount}</span></h3>
                </div>      
                <i className="bx bx-trash" onClick={() => handleDelete(item.id)}></i>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
