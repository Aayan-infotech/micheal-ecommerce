import React, { useEffect, useState } from "react";
import "./beautyproduct.css";
import { Carousel } from "react-responsive-carousel";
// import beautyFirst from "../../images/beautyprodust-second.png";
// import beautySecond from "../../images/beautyproduct-third.jpg";
// import beautyThird from "../../images/beautyproduct-fourth.jpg";
import CarsouelSection from "./carsouelsection/carsouelsection";
import axios from "axios";

function BeautyProduct() {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const storedCategoryId = "6698d9eafc50a7cb09187427";
        if (storedCategoryId) {
          const response = await axios.get(
            `http://13.200.240.28:3003/api/category/get/${storedCategoryId}`
          );
          setSubcategories(response.data.subcategories);
        } else {
          console.error("No category ID found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, []);

  return (
    <div className="beautyproduct">
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
            {subcategories.map((subcategory) => (
              <div className="carousel-slide" key={subcategory._id}>
                <img src={subcategory.image} alt={subcategory.title} />
                <div className="carousel-text">
                  <h2 className="legend1"> {subcategory.title} </h2>
                  <p className="legend2">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        <CarsouelSection />
      </div>
    </div>
  );
}

export default BeautyProduct;
