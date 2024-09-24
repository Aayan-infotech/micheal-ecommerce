import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "./beautyFoodCarsouel.css";
import blankImage from '../../../images/blank_image.jpg';

function BeautyFoodCarsouel() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetchProd = async () => {
      try {
        const response = await fetch("http://3.111.163.2:3129/api/product/getall");
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProd();
  }, []);

  const handleClick = (product) => {
    sessionStorage.setItem("selectProduct", JSON.stringify(product));
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
            products.length > 0 ? (
              products.map((products) => (
                <Link to="/storebeautyprod" key={products._id} onClick={() => handleClick(products)}>
                  <div className="carousel-slide">
                    <img className="carousel-img" src={products?.image || blankImage} alt={products.name} />
                    <div className="carousel-text">
                      <h2 className="legend3">{products.name}</h2>
                      <div className="carousel-infos">
                        <p className="legend4">{products.description}</p>


                        <p className="legend5">
                          <span className="actual-price">${products.price.toFixed(2)}</span>
                          {products.discount > 0 && (
                            <span className="discounted-price">
                              ${(products.price * (1 - products.discount / 100)).toFixed(2)}
                            </span>
                          )}
                        </p>
                        {products.discount > 0 && (
                          <p className="legend6">
                            <span className="price">${products.price.toFixed(2)}</span>
                            <span>{products.discount}% Off</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
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
