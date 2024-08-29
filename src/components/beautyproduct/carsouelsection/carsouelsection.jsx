import React from "react";
import { Carousel } from "react-responsive-carousel";
import beautyFourth from "../../../images/beautyproduct-fifth.jpg";
import beautyFifth from "../../../images/beautyproduct-sixth.jpg";
import beautySixth from "../../../images/beautyproduct-seventh.jpg";
import { Link } from "react-router-dom";
import "./carsouelsection.css";

function carsouelsection() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = monthNames[new Date().getMonth()];

  return (
    <div className="carsouelsection">
      <div className="hightlights-carousel container section">
        <h1 className="highlights-heading">Highlights of {currentMonth}</h1>
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
          <Link to="/beautyproductcarousel">
            <div className="carousel-slide">
              <img className="carousel-img" src={beautyFourth} alt="Product1" />
              <div className="carousel-text">
                <p className="carousel-red">4% off your order</p>
                <p className="carousel-blue">4% off your order</p>
                <h2 className="legend3">Lorem Ipsum</h2>
                <div className="carousel-info">
                  <p className="legend4">
                    1.5 km |{" "}
                    <span>
                      <i class="bx bxs-star"></i>
                    </span>{" "}
                    4.8 (1.2k)
                  </p>
                  <p className="legend5">
                    <i className="bx bx-heart"></i>
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/beautyproductcarousel">
            <div className="carousel-slide">
              <img className="carousel-img" src={beautyFifth} alt="Product2" />
              <div className="carousel-text">
                <p className="carousel-red">4% off your order</p>
                <p className="carousel-blue">4% off your order</p>
                <h2 className="legend3">Lorem Ipsum</h2>
                <div className="carousel-info">
                  <p className="legend4">
                    1.5 km |{" "}
                    <span>
                      <i class="bx bxs-star"></i>
                    </span>{" "}
                    4.8 (1.2k)
                  </p>
                  <p className="legend5">
                    <i className="bx bx-heart"></i>
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/beautyproductcarousel">
            <div className="carousel-slide">
              <img className="carousel-img" src={beautySixth} alt="Product3" />
              <div className="carousel-text">
                <p className="carousel-red">4% off your order</p>
                <p className="carousel-blue">4% off your order</p>
                <h2 className="legend3">Lorem Ipsum</h2>
                <div className="carousel-info">
                  <p className="legend4">
                    1.5 km |{" "}
                    <span>
                      <i class="bx bxs-star"></i>
                    </span>{" "}
                    4.8 (1.2k)
                  </p>
                  <p className="legend5">
                    <i className="bx bx-heart"></i>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </Carousel>
      </div>
    </div>
  );
}

export default carsouelsection;
