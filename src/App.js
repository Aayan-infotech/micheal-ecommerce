import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import PasswordRecovery from "./components/Auth/PasswordRecovery/PasswordRecovery";
import Otp from "./components/Auth/Otp/Otp";
import PasswordReset from "./components/Auth/PasswordReset/PasswordReset";
import Home from "./components/home/Home";
import Store from "./components/store/store";
import AboutUs from "./components/aboutus/AboutUs";
import FrozenFoods from "./components/frozenfoods/FrozenFoods";
import BeautyProduct from "./components/beautyproduct/BeautyProduct";
import FrozenFoodsCarousel from "./components/frozenfoodsCarousel/frozenfoodsCarousel";
import BeautyProductCarousel from "./components/beautyproductCarousel/beautyproduct";
import ContactUs from "./components/contactUs/ContactUs";
import Cart from "./components/cart/Cart";
import ShoppingBag from "./components/shoppingBag/ShoppingBag";
import Address from "./components/address/Address";
import ShopCheckout from "./components/shopCheckout/ShopCheckout";
import PaymentCheckout from "./components/paymentCheckout/PaymentCheckout";
import PaymentMessage from "./components/paymentMessage/PaymentMessage";
import Payment from "./components/payment/Payment";
import Profile from "./components/profile/Profile";
import SearchItems from "./components/SearchItems/SearchItems";
import MyOrders from "./components/myorders/MyOrders";
import TrackOrder from "./components/trackorder/TrackOrder";
import Wishlist from "./components/wishlist/Wishlist";
import Footer from "./components/footer/Footer";
import StoreBeautyProd from "./components/store/beautyFoodCarsouel/storeBeautyProd/storeBeautyProd";
import StoreFrozenFoodProd from "./components/store/frozenFoodCarsouel/storeFrozenFoodProd/storeFrozenFoodProd";
import Notification from "./components/notification/Notification";
import { ProductSubcagegory } from "./components/frozenfoods/ProductSubcagegory";
import PrivacyPolicy from "./components/content/PrivacyPolicy";
import TermsConditions from "./components/content/TermsConditions";
import RefundPolicy from "./components/content/RefundPolicy";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

function App() {
  const location = useLocation();
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const noFooterPaths = [
    "/login",
    "/register",
    "/passwordrecovery",
    "/otp",
    "/passwordreset",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          setIsTokenExpired(true);
          sessionStorage.removeItem("token");
          setToken(null);
        } else {
          console.log("Token is still valid.");
        }
      } catch (error) {
        console.error("Invalid token format:", error.message);
        sessionStorage.removeItem("token");
        setToken(null);
      }
    }
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decodedToken.exp < currentTime) {
            console.log("Token has expired.");
            setIsTokenExpired(true);
            sessionStorage.removeItem("token");
            setToken(null);
          }
        } catch (error) {
          console.error("Invalid token format:", error.message);
          sessionStorage.removeItem("token");
          setToken(null);
        }
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [token]);

  const handleContinueToLogin = () => {
    setIsTokenExpired(false);
    navigate("/login");
  };

  const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const contentStyle = {
    flexGrow: 1,
  };

  return (
    <div className="App" style={layoutStyle}>
      <ToastContainer />
      <Header />
      {isTokenExpired && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            <h2>Login Session Time Expired</h2>
            <p>Your session has expired. Please log in again to continue.</p>
            <button
              onClick={handleContinueToLogin}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Continue to Login
            </button>
          </div>
        </div>
      )}
      <div style={contentStyle}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/passwordrecovery" element={<PasswordRecovery />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/passwordreset" element={<PasswordReset />} />
          <Route path="/home" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/dryfoods/frozenfoods" element={<FrozenFoods />} />
          <Route path="/sub-category" element={<ProductSubcagegory />} />
          <Route path="/cosmeticsproducts" element={<BeautyProduct />} />
          <Route
            path="/frozenfoodscarousel/:productId"
            element={<FrozenFoodsCarousel />}
          />
          <Route
            path="/beautyproductcarousel/:productId"
            element={<BeautyProductCarousel />}
          />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shoppingbag" element={<ShoppingBag />} />
          <Route path="/address" element={<Address />} />
          <Route path="/shopcheckout" element={<ShopCheckout />} />
          <Route path="/order-summary" element={<PaymentCheckout />} />
          <Route path="/paymentmessage" element={<PaymentMessage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/searchitems" element={<SearchItems />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/trackorder/:orderId" element={<TrackOrder />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/storebeautyprod" element={<StoreBeautyProd />} />
          <Route
            path="/storefrozenfoodprod/:storeProId"
            element={<StoreFrozenFoodProd />}
          />
          <Route path="/notification" element={<Notification />} />
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Routes>
      </div>
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
