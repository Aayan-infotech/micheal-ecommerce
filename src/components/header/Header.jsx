import React, { useState, useEffect } from "react";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { useSelector } from "react-redux";

function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false);

  const { items: allProducts } = useSelector((state) => state.cart);
  const totalProducts = allProducts.length;
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    if (token) {
      setIsUserDropdownVisible(false);
    }
  }, [token]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownVisible(!isUserDropdownVisible);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    // setIsLoggedIn(false);
    setIsUserDropdownVisible(false);
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
            </h5>
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
          {isLoggedIn && (
            <Link to="/cart" className="link-text">
              <button className="cart-button">
                <i className="bx bx-cart-alt"></i>
                {totalProducts > 0 && (
                  <span className="cart-badge">{totalProducts}</span>
                )}
              </button>
            </Link>
          )}

          {isLoggedIn ? (
            <>
              <button className="signin-button" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="signin-button">Sign In</button>
            </Link>
          )}
          {isLoggedIn && (
            <>
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
                </div>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
