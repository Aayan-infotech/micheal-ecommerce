import React, { useState, useEffect } from "react";
import axios from "axios";
import "./wishlist.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../loader/Loading";

function Wishlist() {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchFavoritesFromAPI();
    } else {
      fetchFavoritesFromLocalStorage();
    }
  }, [userId]);

  // 🔹 API se favorites fetch karega agar user logged in hai
  const fetchFavoritesFromAPI = async () => {
    try {
      const response = await axios.get(
        `http://54.236.98.193:3129/api/favorite/get/${userId}`
      );
      if (response.data.success && response.data.data.products.length > 0) {
        setWishlists(response.data.data.products);
        setError(null);
      } else {
        setWishlists([]);
        setError("No favorites found!");
      }
    } catch (error) {
      setError("Failed to fetch wishlist items!");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 localStorage se favorites fetch karega agar user logged in nahi hai
  const fetchFavoritesFromLocalStorage = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (storedFavorites.length > 0) {
      setWishlists(storedFavorites);
      setError(null);
    } else {
      setWishlists([]);
      setError("No favorites found!");
    }
    setLoading(false);
  };

  // 🔹 Delete function (API ke liye)
  const handleDelete = async (p_id) => {
    if (userId) {
      try {
        const response = await axios.delete(
          `http://54.236.98.193:3129/api/favorite/delete`,
          { data: { productId: p_id, userId: userId } }
        );
        setWishlists((prev) => prev.filter((item) => item._id !== p_id));
        toast.success(response?.data?.message || "Deleted successfully!", {
          autoClose: 1000,
        });
      } catch (error) {
        toast.error("Failed to delete the item. Please try again.", {
          autoClose: 1000,
        });
      }
    } else {
      // 🔹 localStorage se delete karega agar user logged in nahi hai
      let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      storedFavorites = storedFavorites.filter((item) => item._id !== p_id);
      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
      setWishlists(storedFavorites);
      toast.success("Removed from favorites!", { autoClose: 1000 });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="wishlist">
        <div className="wishlist-container">
          <div className="wishlist-banner">
            <h1>Wishlist</h1>
          </div>
          <div className="wishlist-cart container">
            {loading ? (
              <Loading />
            ) : error ? (
              <h3
                className="no-data-message fw-bold"
                style={{ color: "white" }}
              >
                {error}
              </h3>
            ) : wishlists.length === 0 ? (
              <p className="no-data-message">Your wishlist is empty!</p>
            ) : (
              wishlists.map((item, index) => (
                <div className="wishlists" key={index}>
                  <div className="wishlist-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="wishlist-text">
                    <div className="c-texts">
                      <h2>{item.name}</h2>
                      <p>
                        {item?.rating || "4.5"}
                        <i className="bx bxs-star"></i>
                      </p>
                    </div>
                    <h3 style={{ color: "black" }}>
                      ${item.price}
                      {item.discount > 0 && <span> -{item.discount}%</span>}
                    </h3>
                  </div>
                  <i
                    className="bx bx-trash"
                    onClick={() => handleDelete(item._id)}
                  ></i>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
