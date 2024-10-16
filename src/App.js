import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';
import PasswordRecovery from './components/Auth/PasswordRecovery/PasswordRecovery';
import Otp from './components/Auth/Otp/Otp';
import PasswordReset from './components/Auth/PasswordReset/PasswordReset';
import Home from './components/home/Home';
import Store from './components/store/store';
import AboutUs from './components/aboutus/AboutUs';
import FrozenFoods from './components/frozenfoods/FrozenFoods';
import BeautyProduct from './components/beautyproduct/BeautyProduct';
import FrozenFoodsCarousel from './components/frozenfoodsCarousel/frozenfoodsCarousel';
import BeautyProductCarousel from './components/beautyproductCarousel/beautyproduct';
import ContactUs from './components/contactUs/ContactUs';
import Cart from './components/cart/Cart';
import ShoppingBag from './components/shoppingBag/ShoppingBag';
import Address from './components/address/Address';
import ShopCheckout from './components/shopCheckout/ShopCheckout';
import PaymentCheckout from './components/paymentCheckout/PaymentCheckout';
import PaymentMessage from './components/paymentMessage/PaymentMessage';
import Payment from './components/payment/Payment';
import Profile from './components/profile/Profile';
import SearchItems from './components/SearchItems/SearchItems';
import MyOrders from './components/myorders/MyOrders';
import TrackOrder from './components/trackorder/TrackOrder';
import Wishlist from './components/wishlist/Wishlist';
import Footer from './components/footer/Footer';
import StoreBeautyProd from './components/store/beautyFoodCarsouel/storeBeautyProd/storeBeautyProd';
import StoreFrozenFoodProd from './components/store/frozenFoodCarsouel/storeFrozenFoodProd/storeFrozenFoodProd';
import Notification from './components/notification/Notification';
import { ProductSubcagegory } from './components/frozenfoods/ProductSubcagegory';
// import ProtectedRoute from './ProtectedRoute';

function App() {
  const location = useLocation();
  const noFooterPaths = ["/login", "/register", "/passwordrecovery", "/otp", "/passwordreset"];

  return (
    <div className="App">
      <Header />
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
        <Route path="/frozenfoodscarousel/:productId" element={<FrozenFoodsCarousel />} />
        <Route path="/beautyproductcarousel/:productId" element={<BeautyProductCarousel />} />
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
        {/* <Route path="/storefrozenfoodprod" element={<StoreFrozenFoodProd />} /> */}
        <Route path="/storefrozenfoodprod/:storeProId" element={<StoreFrozenFoodProd />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/" element={<Home />} />

      </Routes>
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
