import React from "react";
import "./footer.css";
import Logo from "../../images/logo.png";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <div className="footer">
      <div className="footer__container container">
        <div className="main_footer">
          <div className="about">
            <img className="footer__logo" src={Logo} alt="" height="80px" width="200px"/>
            <p className="footer__intro">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam.
            </p>
          </div>

          <div className="footer__social">
            <h2 className="footer__title">Nav Links</h2>
            <div className="footer__icons">
              <Link to="./home" className="footer__social-link">Home</Link>
              <Link to="./store" className="footer__social-link">Store</Link>
              <Link to="./aboutus" className="footer__social-link">About Us</Link>
              <Link to="./contactus" className="footer__social-link">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
