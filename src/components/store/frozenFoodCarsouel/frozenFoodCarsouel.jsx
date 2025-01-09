import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./frozenFoodCarsouel.css";
import axios from "axios";

function FrozenFoodCarousel({ categoryType }) {
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryData } = location.state || {};
  console.log(categoryData, 'categoryData---')

  useEffect(() => {
    if (categoryType.length > 0) {
      const categoryId = categoryType[0]?._id;
      fetchProducts(categoryId);
    }
  }, [categoryType]);

  const fetchProducts = async (categoryId) => {
    try {
      const response = await axios.get(`https://www.millysshop.se/api/product/categoryproducts/${categoryId}`);
      setProduct(response?.data?.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleClick = (storeProductId) => {
    navigate(`/storefrozenfoodprod/${storeProductId}`)
    // console.log(storeProdctuId, 'product')
    // sessionStorage.setItem("selectProduct1", JSON.stringify(product));
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
            products?.length > 0 ? (
              products?.map((product, index) => (
                // <Link to="/storefrozenfoodprod" key={index} onClick={() => handleClick(product)}>
                <div key={index} className="carousel-slide" onClick={() => handleClick(product?._id)} style={{ cursor: "pointer" }}>
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

export default FrozenFoodCarousel;
