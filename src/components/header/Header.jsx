import React, { useState, useEffect, useRef } from "react";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { useSelector } from "react-redux";

function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false);
  const { items: allProducts } = useSelector((state) => state.cart);
  const totalProducts = allProducts.length;
  const [cartCount, setCartCount] = useState(0);
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const isLoggedIn = !!token;
  const dropdownRef = useRef();

  const updateCartCount = () => {
    if (userId) {
      setCartCount(allProducts.length);
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(localCart.length);
    }
  };

  useEffect(() => {
    updateCartCount();
  }, [allProducts, userId]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "cart") {
        updateCartCount();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
            <h4>
              <Link to="/home" style={{ color: "#2F2F2F" }}>
                Home
              </Link>
            </h4>
          </div>
          <div className="nav-item">
            <h4>
              <Link to="/store" style={{ color: "#2F2F2F" }}>
                Store
              </Link>
            </h4>
          </div>
          <div className="nav-item">
            <h4>
              <Link to="/aboutus" style={{ color: "#2F2F2F" }}>
                About us
              </Link>
            </h4>
          </div>
          <div className="nav-item">
            <h4>
              <Link to="/contactus" style={{ color: "#2F2F2F" }}>
                Contact Us
              </Link>
            </h4>
          </div>
        </div>
        <div className="nav-actions">
          <Link to="/searchitems" className="link-text" style={{marginRight:"10px"}}>
            <button className="cart-button">
              <i className="bx bx-search"></i>
            </button>
          </Link>

          <Link to="/cart" className="link-text">
            <button className="cart-button">
              <i className="bx bx-cart-alt"></i>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </Link>

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
          <div
            className="user-menu"
            ref={dropdownRef}
            onBlur={(e) => {
              setTimeout(() => {
                if (!dropdownRef.current.contains(document.activeElement)) {
                  setIsUserDropdownVisible(false);
                }
              }, 200);
            }}
          >
            <i
              className="bx bx-dots-vertical-rounded"
              tabIndex={0}
              onClick={toggleUserDropdown}
            ></i>

            {isUserDropdownVisible && (
              <div className="user-dropdown">
                {isLoggedIn && (
                  <>
                    <Link to="/profile">
                      <i className="bx bx-user-circle"></i> My Profile
                    </Link>
                    <Link to="/myorders">
                      <i className="bx bx-package"></i> My Orders
                    </Link>
                  </>
                )}
                <Link to="/wishlist">
                  <i className="bx bx-heart"></i> Wishlist Page
                </Link>
                {/* <Link to="/searchitems">
                  <i className="bx bx-search"></i> Search
                </Link> */}
                <Link to="/notification">
                  <i className="bx bx-bell"></i> Notification
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
