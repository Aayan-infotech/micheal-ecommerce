import React, { useEffect, useState } from "react";
import "./beautyproduct.css";
import { Carousel } from "react-responsive-carousel";
import blankImage from '../../images/blank_image.jpg';
import CarsouelSection from "./carsouelsection/carsouelsection";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from '../loader/Loading';

function BeautyProduct() {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const categoryData = location.state?.categoryData;
  const storedCategoryId = categoryData?._id;

  useEffect(() => {
    if (storedCategoryId) {
      fetchSubcategories();
    }
  }, [storedCategoryId]);

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        `http://44.196.192.232:3129/api/product/categoryproducts/${storedCategoryId}`
      );
      setSubcategories(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching subcategories:", error);
    }
  };

  return (
    <div className="beautyproduct">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="beautyproduct-container">
            <div className="beautyproduct-banner">
              <h1>All In One Place</h1>
              <h1>For</h1>
              <h1>Beauty Products.</h1>
              <p className="beautyproduct-para">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <button className="beautyproduct-button">Sign Up</button>
            </div>

            <div className="beautyproduct-discounts container">
              <h1 className="discounts-heading">Discount guaranteed!</h1>
              <Carousel
                showArrows={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                autoPlay={true}
                interval={3000}
                centerMode={true}
                centerSlidePercentage={60}
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
                {subcategories?.map((subcategory) => (
                  <div className="carousel-slide" key={subcategory._id}>
                    <img src={subcategory?.image || blankImage} alt={subcategory.title} />
                    <div className="carousel-text">
                      <h2 className="legend1"> {subcategory.name || 'N/A'} </h2>
                      <p className="legend2">{subcategory?.description || 'N/A'} </p>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
            <CarsouelSection subcategories={subcategories} />
          </div>
        </>
      )}
    </div>
  );
}

export default BeautyProduct;
