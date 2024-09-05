import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // Import useParams to access route parameters
import "./frozenfoods.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import frozenfirst from "../../images/Frozenfoods-first.png";
import frozenSecond from "../../images/Frozenfoods-second.jpg";
import CarsouelSection from "./carsouelsection/carsouelsection";
import axios from "axios";

function FrozenFoods() {
  // Optionally use useParams if you want to get the categoryId from the route.
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);

  // Fetch subcategories based on the categoryId stored in localStorage
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        // Get the category ID from localStorage
        const storedCategoryId = localStorage.getItem("CategoryId") || categoryId;

        // Check if there is a category ID available
        if (storedCategoryId) {
          const response = await axios.get(
            `http://13.200.240.28:3003/api/category/get/${storedCategoryId}`  // Use the categoryId from localStorage
          );
          setSubcategories(response.data.subcategories); // Assuming data structure has the subcategories in response.data.data
        } else {
          console.error("No category ID found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, [categoryId]); // Optionally include categoryId in the dependency array

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

export default FrozenFoods;
