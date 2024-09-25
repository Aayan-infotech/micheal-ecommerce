import React, { useEffect, useState } from "react";
import "./frozenfoods.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CarsouelSection from "./carsouelsection/carsouelsection";
import axios from "axios";

function FrozenFoods() {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const storedCategoryId = "6698d0a1034236d25d256698";
        if (storedCategoryId) {
          const response = await axios.get(
            `http://44.196.192.232:3129/api/category/get/${storedCategoryId}` 
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
    <div className="frozenfoods">
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
            
            {subcategories.map((subcategory) => (
              <div className="carousel-slide" key={subcategory._id}>
              <img src={subcategory.image} alt={subcategory.title} />
              <div className="carousel-text">
                <h2 className="legend1"> {subcategory.title} </h2>
                <p className="legend2">{subcategory?.description || 'N/A'} </p>
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

export default FrozenFoods;
