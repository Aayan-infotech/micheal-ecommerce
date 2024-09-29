import React, { useEffect, useState } from "react";
import "./frozenfoods.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CarsouelSection from "./carsouelsection/carsouelsection";
import axios from "axios";
import { useLocation } from "react-router-dom";
import blankImage from '../../images/blank_image.jpg';
import Loading from '../loader/Loading';

function FrozenFoods() {
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
      console.log(response?.data?.data, 'response?.data?.data')
      setSubcategories(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching subcategories:", error);
    }
  };

  return (
    <div className="frozenfoods">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="frozenfoods-container">
            <div className="frozenfoods-banner">
              <h1>All In One Place</h1>
              <h1>For</h1>
              <h1>Frozen Foods.</h1>
              <p className="frozenfoods-para">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <button className="frozenfoods-button">Sign Up</button>
            </div>

            <div className="frozenfoods-discounts container">
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

                {subcategories?.map((subcategory, index) => (
                  <div className="carousel-slide" key={index}>
                    <img src={subcategory?.image || blankImage} alt={subcategory?.name || 'no image'} />
                    <div className="carousel-text">
                      <h2 className="legend1"> {subcategory?.name || 'N/A'} </h2>
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

export default FrozenFoods;
