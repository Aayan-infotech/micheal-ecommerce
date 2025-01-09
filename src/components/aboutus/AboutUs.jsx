import React from "react";
import "./aboutus.css";
import aboutusFirst from "../../images/aboutus-first.jpg";
import aboutusSecond from "../../images/aboutus-second.png";
import aboutusThird from "../../images/aboutus-third.jpg";
import aboutusFourth from "../../images/aboutus-fourth.jpg";
import aboutusFifth from "../../images/aboutus-fifth.jpg";

function AboutUs() {
  return (
    <div className="aboutus">
      <div className="aboutus-container">
        <div className="banner-aboutUs">
          <h1>About Us</h1>
          <p className="aboutus-para">
            Welcome to MIllysHB, your one-stop online destination for beauty and
            nourishment!
          </p>
        </div>
        <div style={{ marginTop: "40px" }}>
          <div className="first-text">
            <h2 style={{ color: "black" }}>Why Choose Us?</h2>
            <p>
              Premium Quality: We handpick products that are reliable,
              effective, and safe. Convenience: Shop from the comfort of your
              home and enjoy fast, hassle-free delivery. Customer-Centric: Your
              satisfaction is our top priority, and we’re here to assist you
              every step of the way.
            </p>
            <br />
            <p>
              Sustainability: We are committed to offering eco-friendly
              packaging and sustainable sourcing practices.
            </p>
            <br />
            <p>
              At MIllysHB, we’re more than just a store; we’re a partner in your
              journey toward beauty and well-being. Explore our collections
              today and experience the perfect blend of elegance and nourishment
            </p>
          </div>
          <div className="first-text"></div>
          <div className="first-text"></div>
        </div>
        <div className="container section aboutus-content">
          <div className="aboutus-first-sec">
            <img src={aboutusFirst} alt="" width="560" height="320" />
            <div className="first-inner-img">
              <img src={aboutusSecond} alt="" width="220" height="180" />
              <img src={aboutusThird} alt="" width="320" height="180" />
            </div>
          </div>
          <div className="aboutus-second-sec">
            <h4 style={{ color: "black" }}>
              At MIllysHB we believe in celebrating the best of both
              worlds—enhancing your natural beauty with premium cosmetics and
              nourishing your lifestyle with top-quality dry and frozen foods.
              Our carefully curated selection is designed to cater to your daily
              essentials and indulgences alike.
            </h4>
            <div className="aboutus-sec-first">
              <img src={aboutusFourth} alt="" width="100" height="100" />
              <div className="first-text">
                <h3 className="aboutus-text">Cosmetics: Unleash Your Beauty</h3>
                <p>
                  Our cosmetics collection features a diverse range of products
                  to suit every skin type, tone, and style. From skincare that
                  nurtures and rejuvenates to makeup that lets you express your
                  individuality, we source only the finest brands and
                  ingredients to ensure you look and feel your best.
                </p>
              </div>
            </div>
            <div className="about-sec-second">
              <img src={aboutusFifth} alt="" width="100" height="100" />
              <div className="first-text">
                <h3 className="aboutus-text">
                  Dry & Frozen Foods: Quality You Can Trust
                </h3>
                <p>
                  Our food category offers an assortment of pantry staples and
                  frozen delights to keep your kitchen stocked and your meals
                  flavorful. We prioritize freshness, taste, and nutrition,
                  ensuring that every bite meets the highest standards of
                  quality.
                </p>
              </div>
            </div>
            <button>Join our Team</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
