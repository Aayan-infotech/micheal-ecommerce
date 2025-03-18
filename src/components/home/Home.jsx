import React, { useEffect, useState } from "react";
import "./home.css";
import fastfood from "../../images/fast-food 2.png";
import outline from "../../images/outline.png";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import blankImage from "../../images/blank_image.jpg";
import axios from "axios";
import Loading from "../loader/Loading";

function Home() {
  const [categoryType, setCategoryType] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://54.236.98.193:3129/api/product/getall?webView=true"
      );
      setAllProducts(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategoriesType();
    fetchAllProducts();
  }, []);

  const fetchAllCategoriesType = async () => {
    try {
      const response = await axios.get(
        "http://54.236.98.193:3129/api/category/get"
      );
      setCategoryType(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const dryFrozenFoods = categoryType.find(
    (category) =>
      category.title.includes("Dry Foods") ||
      category.title.includes("Frozen Foods")
  );

  const cosmeticsProducts = categoryType.find((category) =>
    category.title.includes("Cosmetics Products")
  );

  const handleNavigation = (category) => {
    if (category?.title?.includes("Dry Foods")) {
      navigate("/dryfoods/frozenfoods", { state: { categoryData: category } });
    } else {
      navigate("/cosmeticsproducts", { state: { categoryData: category } });
    }
  };

  const handleClick = (storeProductId) => {
    navigate(`/storefrozenfoodprod/${storeProductId}`);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="home">
            <div className="contain">
              <div className="home-top">
                <p>
                  Discover premium cosmetics and high-quality dry & frozen
                  foods, all in one place
                </p>
                {!token && (
                  <Link to="/register" className="logo">
                    <button>Sign Up</button>
                  </Link>
                )}
              </div>
              <div className="home-bottom">
                <div className="store">
                  <span className="frozen-img"></span>
                  <p
                    className="frozenp"
                    onClick={() => handleNavigation(dryFrozenFoods)}
                  >
                    <img src={fastfood} alt="" />
                    Visit Store<i className="bx bx-right-arrow-alt"></i>
                  </p>
                </div>
                <span></span>
                <div className="store">
                  <span className="cosemetic-img"></span>
                  <p
                    className="cosemeticp"
                    onClick={() => handleNavigation(cosmeticsProducts)}
                  >
                    <img src={outline} alt="" />
                    Visit Store<i className="bx bx-right-arrow-alt"></i>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {allProducts?.filter((product) => product?.stock > 0)?.length > 0 ? (
            <div className="carousel-container">
              <h1 className="highlights-heading">All Products</h1>
              {allProducts?.length > 0 ? (
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
                  {allProducts
                    ?.filter((product) => product?.stock > 0)
                    .map((product, index) => (
                      <div
                        key={index}
                        className="carousel-slide"
                        onClick={() => handleClick(product?._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          className="carousel-img"
                          src={product?.image || blankImage}
                          alt={product?.name}
                        />
                        <div className="carousel-text">
                          <h2 className="legend3">{product?.name}</h2>
                          <div className="carousel-infos">
                            <p className="legend4">{product?.description}</p>
                            <p className="legend5">
                              <span className="actual-price">
                                ${product?.price.toFixed(2)}
                              </span>
                              {product?.discount > 0 && (
                                <span className="discounted-price">
                                  $
                                  {(
                                    product?.price *
                                    (1 - product?.discount / 100)
                                  ).toFixed(2)}
                                </span>
                              )}
                            </p>
                            {product?.discount > 0 && (
                              <p className="legend6">
                                <span className="price">
                                  ${product?.price.toFixed(2)}
                                </span>
                                <span>{product?.discount}% Off</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </Carousel>
              ) : (
                <p>No products available</p>
              )}
            </div>
          ) : (
            <p>No products available</p>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
