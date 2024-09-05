import React from "react";
import { Carousel } from "react-responsive-carousel";
import frozenThird from "../../../images/Frozenfoods-third.jpg";
import frozenFourth from "../../../images/Frozenfoods-fourth.jpg";
import frozenFifth from "../../../images/Frozenfoods-fifth.jpg";
import { Link } from "react-router-dom";
import "./frozenFoodCarsouel.css";

function frozenFoodCarousel() {

  return (
    <div className="carsouelsection">
      <div className="hightlights-carousel container section">
        <h1 className="highlights-heading">Frozen Food</h1>
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
          <Link to="/frozenfoodsCarousel">
            <div className="carousel-slide">
              <img className="carousel-img" src={frozenThird} alt="Product1" />
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
          <Link to="/frozenfoodsCarousel">
            <div className="carousel-slide">
              <img className="carousel-img" src={frozenFourth} alt="Product2" />
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
          <Link to="/frozenfoodsCarousel">
            <div className="carousel-slide">
              <img className="carousel-img" src={frozenFifth} alt="Product3" />
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

export default frozenFoodCarousel;
