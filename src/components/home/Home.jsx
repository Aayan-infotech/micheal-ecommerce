import React from "react";
import "./home.css";
import fastfood from "../../images/fast-food 2.png";
import outline from "../../images/outline.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="contain">
        <div className="home-top">
          <h1>All In One Place For Frozen Foods And Cosmetics</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <Link to="/register" className="logo">
            <button>Sign Up</button>
          </Link>
        </div>
        <div className="home-bottom">
          <div className="store">
            <span className="frozen-img"></span>
            <Link to="/dryfoods/frozenfoods">
              <p className="frozenp">
                <img src={fastfood} alt="" />
                Visit Store<i class="bx bx-right-arrow-alt"></i>
              </p>
            </Link>
          </div>
          <span></span>
          <div className="store">
            <span className="cosemetic-img"></span>
            <Link to="/cosmeticsproducts">
              <p className="cosemeticp">
                <img src={outline} alt="" />
                Visit Store<i class="bx bx-right-arrow-alt"></i>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
