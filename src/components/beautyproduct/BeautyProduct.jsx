import React from "react";
import "./beautyproduct.css";
import { Carousel } from 'react-responsive-carousel';
import beautyFirst from "../../images/beautyprodust-second.png";
import beautySecond from "../../images/beautyproduct-third.jpg";
import beautyThird from "../../images/beautyproduct-fourth.jpg";
import CarsouelSection from "./carsouelsection/carsouelsection";

function BeautyProduct() {
  return (
    <div className="beautyproduct">
      <div className="beautyproduct-container">
        <div className="beautyproduct-banner">
          <h1>All In One Place</h1>
          <h1>For</h1>
          <h1>Beauty Products.</h1>
          <p className="beautyproduct-para">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <button className="beautyproduct-button">Sign Up</button>
        </div>

        <div className="beautyproduct-discounts container">
          <h1 className="discounts-heading">Discount guaranteed!</h1>
          <Carousel showArrows={true} infiniteLoop={true} showThumbs={false} showStatus={false} autoPlay={true} interval={3000} centerMode={true} centerSlidePercentage={60} showIndicators={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button type="button" className="carousel-arrow prev" onClick={onClickHandler} title={label}>
                  &lt;
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button type="button" className="carousel-arrow next" onClick={onClickHandler} title={label}>&gt;</button>
              )
            }>
            <div className="carousel-slide">
              <img src={beautyFirst} alt="Product1" />
              <div className="carousel-text">
                <h2 className="legend1">Áp dụng 02 voucher mỗi đơn</h2>
                <p className="legend2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </div>
            <div className="carousel-slide">
              <img src={beautySecond} alt="Product2" />
              <div className="carousel-text">
                <h2 className="legend1">Áp dụng 02 voucher mỗi đơn</h2>
                <p className="legend2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </div>
            <div className="carousel-slide">
              <img src={beautyThird} alt="Product3" />
              <div className="carousel-text">
                <h2 className="legend1">Áp dụng 02 voucher mỗi đơn</h2>
                <p className="legend2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </div>
          </Carousel>
        </div>

        <CarsouelSection />
      </div>
    </div>
  );
}

export default BeautyProduct;
