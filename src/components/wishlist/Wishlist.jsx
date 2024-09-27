import React, { useState, useEffect } from "react";
import axios from "axios";
import "./wishlist.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../loader/Loading';

function Wishlist() {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`http://44.196.192.232:3129/api/favorite/get/${userId}`);
      setWishlists(response.data.data.products || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error fetching favorites', error);
    }
  };

  const handleDelete = async (p_id) => {
    try {
      const response = await axios.delete(`http://44.196.192.232:3129/api/favorite/delete`, { data: { productId: p_id, userId: userId } });
      const updateWishlists = wishlists.filter(item => item._id !== p_id);
      setWishlists(updateWishlists);
      toast.success(response?.data?.message || 'Deleted successfully!', {
        autoClose: 1000
      });
      fetchFavorites();
    } catch (error) {
      console.log('Error deleting favorite', error);
      toast.error('Failed to delete the item. Please try again.', {
        autoClose: 1000
      });
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
            ) : (
              <>
                {wishlists.map((item) => (
                  <div className="wishlists" key={item._id}>
                    <div className="wishlist-img">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="wishlist-text">
                      <div className="c-texts">
                        <h2>{item.name}</h2>
                        <p>{item?.rating || '4.5'}<i class="bx bxs-star"></i></p>
                      </div>
                      <h3 style={{ color: 'black' }}>
                        ${item.price}
                        {item.discount > 0 && <span> -{item.discount}%</span>}
                      </h3>
                    </div>
                    <i className="bx bx-trash" onClick={() => handleDelete(item._id)}></i>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
