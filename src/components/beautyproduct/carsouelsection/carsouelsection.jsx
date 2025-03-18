import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./carsouelsection.css";
import axios from "axios";

function Carsouelsection({ categoriesProduct }) {
  const [loadingFavoriteId, setLoadingFavoriteId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = monthNames[new Date().getMonth()];
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `http://54.236.98.193:3129/api/favorite/get/${userId}`
      );
      const favoriteProducts = response?.data?.data?.products.map(
        (product) => product._id
      );
      setFavorites(favoriteProducts || []);
    } catch (error) {
      console.log("Error fetching favorites", error);
    }
  };

  const addToFavorites = async (productId) => {
    try {
      setLoadingFavoriteId(productId);
      const response = await axios.post(
        "http://54.236.98.193:3129/api/favorite/add",
        {
          userId: userId,
          productId: productId,
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message, {
          autoClose: 2000,
        });
        setFavorites([...favorites, productId]);
      } else {
        toast.warn(response?.data?.message, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.warn(error.response?.data?.message, {
          autoClose: 2000,
        });
      } else {
        toast.error("An error occurred, please try again later.", {
          autoClose: 2000,
        });
      }
    } finally {
      setLoadingFavoriteId(null);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="carsouelsection">
        <div className="hightlights-carousel section">
          <h1 className="highlights-heading">Highlights of {currentMonth}</h1>
          {categoriesProduct && categoriesProduct.length > 0 ? (
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
              {categoriesProduct?.map((product, index) => (
                <Link to={`/beautyproductcarousel/${product?._id}`} key={index}>
                  <div className="carousel-slide">
                    <img
                      className="carousel-img"
                      src={product?.image}
                      alt={product?.name}
                    />
                    <div className="carousel-text">
                      <p className="carousel-red">
                        {product?.discount ?? 0}% off your order
                      </p>
                      <p className="carousel-blue">
                        {product?.discount ?? 0}% off your order
                      </p>
                      <h2 className="legend3">{product?.name || "N/A"}</h2>
                      <h4 className="legend3">
                        Price: ${product?.price || "N/A"}
                      </h4>
                      <div className="carousel-info">
                        {/* <p className="legend4">1.5 km |  <span>
                        <i className="bx bxs-star"></i>
                      </span>{" "}
                        4.8 (1.2k)</p> */}
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
                            {loadingFavoriteId === product._id ? (
                              <i className="bx bx-loader bx-spin"></i>
                            ) : favorites.includes(product._id) ? (
                              <i className="bx bxs-heart active-favorite"></i>
                            ) : (
                              <i className="bx bx-heart"></i>
                            )}
                          </p>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Carousel>
          ) : (
            <p className="no-data-message">No data available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Carsouelsection;
