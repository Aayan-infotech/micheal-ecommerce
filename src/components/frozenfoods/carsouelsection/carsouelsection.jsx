import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import "./carsouelsection.css";
import axios from "axios";

function CarsouelSection() {
  const [getAllProducts, setGetAllProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const currentMonth = monthNames[new Date().getMonth()];
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchAllProducts();
    fetchFavorites();
  }, []);

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('http://3.111.163.2:3129/api/product/getall');
      setGetAllProducts(response?.data?.data);
    } catch (error) {
      console.log('something went wrong', error);
    }
  };

  // Fetch favorite products
  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`http://3.111.163.2:3129/api/favorite/get/${userId}`);
      const favoriteProducts = response?.data?.data?.products.map((product) => product._id);
      setFavorites(favoriteProducts || []);
    } catch (error) {
      console.log('Error fetching favorites', error);
    }
  };

  const addToFavorites = async (productId) => {
    try {
      const response = await axios.post('http://3.111.163.2:3129/api/favorite/add', {
        userId: userId,
        productId: productId
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message, {
          autoClose: 2000
        });
        setFavorites([...favorites, productId]);
      } else {
        toast.warn(response?.data?.message, {
          autoClose: 2000
        });
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.warn(error.response?.data?.message, {
          autoClose: 2000
        });
      } else {
        console.log('something went wrong', error);
        toast.error("An error occurred, please try again later.", {
          autoClose: 2000
        });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="carsouelsection">
        <div className="hightlights-carousel container section">
          <h1 className="highlights-heading">Highlights of {currentMonth}</h1>
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            interval={3000}
            centerMode={true}
            centerSlidePercentage={33.33}
            showIndicators={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type="button"
                  className="carousel-arrow prev"
                  onClick={onClickHandler}
                  title={label}
                >
                  &lt;
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type="button"
                  className="carousel-arrow next"
                  onClick={onClickHandler}
                  title={label}
                >
                  &gt;
                </button>
              )
            }
          >
            {getAllProducts.map((product, index) => (
              <Link to={`/frozenfoodsCarousel/${product?._id}`} key={index}>
                <div className="carousel-slide">
                  <img className="carousel-img" src={product?.image} alt={product?.name} />
                  <div className="carousel-text">
                    <p className="carousel-red">{product?.discount}% off your order</p>
                    <p className="carousel-blue">{product?.discount}% off your order</p>
                    <h2 className="legend3">{product?.name}</h2>
                    <div className="carousel-info">
                      <p className="legend4">1.5 km |  <span>
                        <i className="bx bxs-star"></i>
                      </span>{" "}
                        4.8 (1.2k)</p>
                      <p
                        className="favourite-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToFavorites(product?._id);
                        }}
                      >
                        <p
                          className="favourite-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToFavorites(product?._id);
                          }}
                        >
                          {favorites.includes(product._id) ? (
                            <i className='bx bxs-heart active-favorite'></i>
                          ) : (
                            <i className='bx bx-heart'></i>
                          )}
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default CarsouelSection;
