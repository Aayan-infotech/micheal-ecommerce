import React, { useState, useEffect } from "react";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login state
  const [refreshNavbar, setRefreshNavbar] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [refreshNavbar]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownVisible(!isUserDropdownVisible);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    setIsLoggedIn(false);
    setIsUserDropdownVisible(false);
    setRefreshNavbar(!refreshNavbar);
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className="container contain head-contain">
        <Link to="/home" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="menu-icon" onClick={toggleMenu}></div>
        <div className={`navigation ${isMenuVisible ? "show" : ""}`}>
          <div className="nav-item">
            <p>01</p>
            <h5>
              <Link to="/home" style={{ color: "#2F2F2F" }}>
                Home
              </Link>
            </h5>
          </div>
          <div className="nav-item">
            <p>02</p>
            <h5>
              <Link to="/store" style={{ color: "#2F2F2F" }}>
                Store
              </Link>
              {/* <i className="bx bx-chevron-down"></i> */}
            </h5>
            {/* {isDropdownVisible && (
              <div className="dropdown">
                <a href="#frozen-food-store">
                  <Link to="/dryfoods/frozenfoods" style={{ color: "#2F2F2F" }}>
                    Frozen Food Store
                  </Link>
                </a>
                <a href="#beauty-products-store">
                  <Link to="/cosmeticsproducts" style={{ color: "#2F2F2F" }}>
                    Beauty Products Store
                  </Link>
                </a>
              </div>
            )} */}
          </div>
          <div className="nav-item">
            <p>03</p>
            <h5>
              <Link to="/aboutus" style={{ color: "#2F2F2F" }}>
                About us
              </Link>
            </h5>
          </div>
          <div className="nav-item">
            <p>04</p>
            <h5>
              <Link to="/contactus" style={{ color: "#2F2F2F" }}>
                Contact Us
              </Link>
            </h5>
          </div>
        </div>
        <div className="nav-actions">
          <button className="cart-button">
            <Link to="/cart" className="link-text">
              <i className="bx bx-cart-alt"></i>
            </Link>
          </button>

          {/* Conditionally render the Sign In or Log Out button */}
          {isLoggedIn ? (
            <button className="signin-button" onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <Link to="/login">
              <button className="signin-button">Sign In</button>
            </Link>
          )}
          {/* <button
            className="signin-button"
            onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
          >
            {isLoggedIn ? "Log Out" : "Sign In"}
          </button> */}
          <i
            className="bx bx-dots-vertical-rounded"
            onClick={toggleUserDropdown}
          ></i>
          {isUserDropdownVisible && (
            <div className="user-dropdown">
              <Link to="/profile">
                <i className="bx bx-user-circle"></i> My Profile
              </Link>
              <Link to="/myorders">
                <i className="bx bx-package"></i> My Orders
              </Link>
              <Link to="/wishlist">
                <i className="bx bx-heart"></i> Wishlist Page
              </Link>
              <Link to="/searchitems">
                <i className="bx bx-search"></i> Search
              </Link>
              <Link to="/notification">
                <i className="bx bx-bell"></i> Notification
              </Link>
              {!isLoggedIn ? isLoggedIn :
                <div className="logout-button" onClick={handleLogout}>
                  <i className="bx bx-log-out"></i> Log Out
                </div>}

            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
