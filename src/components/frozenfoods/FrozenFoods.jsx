import React from "react";
import "./frozenfoods.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import frozenfirst from "../../images/Frozenfoods-first.png";
import frozenSecond from "../../images/Frozenfoods-second.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarsouelSection from "./carsouelsection/carsouelsection";

function FrozenFoods() {

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
            <div className="carousel-slide">
              <img src={frozenfirst} alt="Pasta" />
              <div className="carousel-text">
                <h2 className="legend1">Áp dụng 02 voucher mỗi đơn</h2>
                <p className="legend2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry.
                </p>
              </div>
            </div>
            <div className="carousel-slide">
              <img src={frozenSecond} alt="Dish 1" />
              <div className="carousel-text">
                <h2 className="legend1">Áp dụng 02 voucher mỗi đơn</h2>
                <p className="legend2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry.
                </p>
              </div>
            </div>
            <div className="carousel-slide">
              <img src={frozenfirst} alt="Dish 2" />
              <div className="carousel-text">
                <h2 className="legend1">Áp dụng 02 voucher mỗi đơn</h2>
                <p className="legend2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry.
                </p>
              </div>
            </div>
          </Carousel>
        </div>

        <CarsouelSection />
      </div>
    </div>
  );
}

export default FrozenFoods;
