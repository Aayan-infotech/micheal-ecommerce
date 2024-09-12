import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "./frozenFoodCarsouel.css";

function FrozenFoodCarousel() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetchProd = async () => {
      try {
        const response = await fetch("http://13.200.240.28:3003/api/product/getall");
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProd();
  }, []);

  const handleClick = (product) => {
    sessionStorage.setItem("selectProduct1", JSON.stringify(product));
  }

  return (
    <div className="carsouelsection">
      <div className="hightlights-carousel container section">
        <h1 className="highlights-heading">Frozen Food Products</h1>
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
          {
            products.length > 0 ? (
              products.map((product) => (
                <Link to="/storefrozenfoodprod" key={product._id} onClick={() => handleClick(product)}>
                  <div className="carousel-slide">
                    <img className="carousel-img" src={product.image} alt={product.name} />
                    <div className="carousel-text">
                      <h2 className="legend3">{product.name}</h2>
                      <div className="carousel-infos">
                        <p className="legend4">{product.description}</p>
                        <p className="legend5">
                          <span className="actual-price">${product.price.toFixed(2)}</span>
                          {product.discount > 0 && (
                            <span className="discounted-price">
                              ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                            </span>
                          )}
                        </p>
                        {product.discount > 0 && (
                          <p className="legend6">
                            <span className="price">${product.price.toFixed(2)}</span>
                            <span>{product.discount}% Off</span>
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

export default FrozenFoodCarousel;
