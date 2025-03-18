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
            <img className="footer__logo" src={Logo} alt="" height="80px" width="200px" />
            <p className="footer__intro">
            MIllysHB is your ultimate online destination for premium cosmetics and high-quality dry and frozen foods, offering convenience, quality, and style in every purchase.
            </p>
          </div>

          <div className="footer__social">
            <h2 className="footer__title">Nav Links</h2>
            <div style={{ lineHeight: "30px" }}>
              <Link style={{textDecoration:"none"}} to="/home"><h4 className="nav-links-url">Home</h4></Link>
              <Link style={{textDecoration:"none"}} to="/store"><h4 className="nav-links-url">Store</h4></Link>
              <Link style={{textDecoration:"none"}} to="/aboutus"><h4 className="nav-links-url">About Us</h4></Link>
              <Link style={{textDecoration:"none"}} to="/contactus"><h4 className="nav-links-url">Contact Us</h4></Link>
              <Link style={{textDecoration:"none"}} to="/privacy-policy"><h4 className="nav-links-url">Privacy Policy</h4></Link>
              <Link style={{textDecoration:"none"}} to="/terms-conditions"><h4 className="nav-links-url">Terms & Conditions</h4></Link>
              <Link style={{textDecoration:"none"}} to="/refund-policy"><h4 className="nav-links-url">Refund Policy</h4></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
