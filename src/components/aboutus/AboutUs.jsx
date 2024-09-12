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
          <p className="aboutus-para">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="container section aboutus-content">
            <div className="aboutus-first-sec">
                <img src={aboutusFirst} alt="" width="560" height="320"/>
                <div className="first-inner-img">
                    <img src={aboutusSecond} alt="" width="220" height="180"/>
                    <img src={aboutusThird} alt="" width="320" height="180"/>
                </div>
            </div>
            <div className="aboutus-second-sec">
                <h1 className="aboutus-text second-text">Lorem Ipsum is simply dummy text of the printing.</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <div className="aboutus-sec-first">
                    <img src={aboutusFourth} alt="" width="100" height="100"/>
                    <div className="first-text">
                        <h3 className="aboutus-text">All Frozen Food Products</h3>
                        <p>One place for all sort of your requirements of frozen food.</p>
                    </div>
                </div>
                <div className="about-sec-second">
                    <img src={aboutusFifth} alt="" width="100" height="100"/>
                    <div className="first-text">
                        <h3 className="aboutus-text">All Cosmetics Products</h3>
                        <p>One place for all sort of your requirements of cosmetics products.</p>
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
