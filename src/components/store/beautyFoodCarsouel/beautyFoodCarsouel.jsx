import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link, useNavigate } from "react-router-dom";
import "./beautyFoodCarsouel.css";
import blankImage from '../../../images/blank_image.jpg';
import axios from "axios";

function BeautyFoodCarsouel({categoryType}) {
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryType.length > 0) {
      const categoryId = categoryType[0]?._id;
      fetchProducts(categoryId);
    }
  }, [categoryType]);

  const fetchProducts = async (categoryId) => {
    try {
      const response = await axios.get(`http://44.196.64.110:3129/api/product/categoryproducts/${categoryId}`);
      console.log(response?.data?.data, '--------beatury food')
      setProduct(response.data?.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleClick = (storeProductId) => {
    navigate(`/storefrozenfoodprod/${storeProductId}`)
  }

  return (
    <div className="carsouelsection">
      <div className="hightlights-carousel container section">
        <h1 className="highlights-heading">Beauty Products</h1>
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
          }>
          {
            products?.length > 0 ? (
              products?.map((products, index) => (
                // <Link to="/storebeautyprod" key={products._id} onClick={() => handleClick(products)}>
                  <div key={index} className="carousel-slide" onClick={() => handleClick(products?._id)} style={{cursor:"pointer"}}>
                    <img className="carousel-img" src={products?.image || blankImage} alt={products?.name} />
                    <div className="carousel-text">
                      <h2 className="legend3">{products?.name}</h2>
                      <div className="carousel-infos">
                        <p className="legend4">{products?.description}</p>
                        <p className="legend5">
                          <span className="actual-price">${products?.price.toFixed(2)}</span>
                          {products?.discount > 0 && (
                            <span className="discounted-price">
                              ${(products?.price * (1 - products?.discount / 100)).toFixed(2)}
                            </span>
                          )}
                        </p>
                        {products?.discount > 0 && (
                          <p className="legend6">
                            <span className="price">${products?.price.toFixed(2)}</span>
                            <span>{products?.discount}% Off</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                // </Link>
              ))
            ) : (
              <p>No products available</p>
            )
          }
        </Carousel>
      </div>
    </div>
  );
}

export default BeautyFoodCarsouel;
