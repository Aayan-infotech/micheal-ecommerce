import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import "../../../src/components/frozenfoods/ProductSubcagegory.css";
import blankImage from "../../images/blank_image.jpg";
import Loading from "../loader/Loading";

export const ProductSubcagegory = () => {
  const [subCategoryProducts, setSubCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { subCategoryProduct } = location.state || {};
  const subCatId = subCategoryProduct?._id;

  useEffect(() => {
    if (subCatId) {
      fetchSubCategoriesProduct();
    }
  }, [subCatId]);

  const fetchSubCategoriesProduct = async () => {
    try {
      const response = await axios.get(
        `http://54.236.98.193:3129/api/product/subcategory/${subCatId}`
      );
      setSubCategoryProducts(response?.data?.data);
    } catch (err) {
      console.log(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // Use a ternary operator for rendering
  return loading ? (
    <Loading />
  ) : (
    <div style={{ padding: "20px" }}>
      <div>
        <h2 className="subcategory-details">Sub Category</h2>
      </div>
      <div className="product-category-card">
        <div className="subcategory">
          <img
            src={subCategoryProduct?.image || blankImage}
            alt="Sub Category"
          />
        </div>
        <div className="subcategory-details">
          <h1 style={{ color: "black" }}>{subCategoryProduct?.title}</h1>
        </div>
      </div>
      <div>
        <h2 className="subcategory-details">Product</h2>
      </div>
      {subCategoryProducts.length === 0 ? (
        <div>No products found for this subcategory!</div>
      ) : (
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
          {subCategoryProducts.map((product, index) => (
            <Link to={`/frozenfoodsCarousel/${product?._id}`} key={index}>
              <div className="carousel-slide">
                <img
                  className="carousel-img"
                  src={product?.image || blankImage}
                  alt={product?.name}
                />
                <div className="carousel-text">
                  <p className="carousel-red">
                    {product?.discount}% off your order
                  </p>
                  <p className="carousel-blue">
                    {product?.discount}% off your order
                  </p>
                  <h2 className="legend3">{product?.name}</h2>
                  <div className="carousel-info">
                    <p className="legend4">
                      1.5 km |{" "}
                      <span>
                        <i className="bx bxs-star"></i>
                      </span>{" "}
                      4.8 (1.2k)
                    </p>
                    <p className="favourite-btn">
                      {product.isHighlight ? (
                        <i className="bx bxs-heart active-favorite"></i>
                      ) : (
                        <i className="bx bx-heart"></i>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      )}
    </div>
  );
};
