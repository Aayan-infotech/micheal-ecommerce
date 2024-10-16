import React, { useEffect, useState } from "react";
import "./paymentcheckout.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import Loading from '../../components/loader/Loading';

function PaymentCheckout() {
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [savings, setSavings] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [bagValue, setBagValue] = useState(0);
  const [vouchers, setVouchers] = useState([]); 
  const [selectedVoucher, setSelectedVoucher] = useState("");
  const [availableVouchers, setAvailableVouchers] = useState(0); 
  const [selectedVoucherDiscount, setSelectedVoucherDiscount] = useState(null); 

  const location = useLocation();
  const { selectedSlot, addressId } = location.state || {};
  const userId = sessionStorage.getItem("userId");

  const applyCoupon = async () => {
    if (!isCouponApplied && selectedVoucher) {
      try {
        const response = await axios.post("http://44.196.192.232:3129/api/voucher/apply", {
          code: selectedVoucher,
          purchaseAmount: totalAmount,
        });
  
        if (response.data.success) {
          const discountValue = response.data.discountValue; // Assuming this value is sent back
          const discount = totalAmount * (discountValue / 100);
          const updatedSavings = parseFloat(discount.toFixed(2));
          const updatedTotalAmount = parseFloat((totalAmount - discount).toFixed(2));
          
          setSavings(updatedSavings);
          setTotalAmount(updatedTotalAmount);
          setIsCouponApplied(true);
          setSelectedVoucherDiscount(discountValue);
          fetchOrderSummary();
          
          // Show success message from the response
          toast.success(response.data.message || "Voucher applied successfully!", { autoClose: 1000 });
        } else {
          // Show the specific error message from the response
          toast.error(response.data.message || "Failed to apply the voucher.", { autoClose: 1000 });
        }
      } catch (error) {
        // Handle network or other errors
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(`Error: ${errorMessage}`, { autoClose: 1000 });
        console.error("Error applying coupon:", errorMessage);
      }
    }
  };  
 
  useEffect(() => {
    fetchOrderSummary();
    fetchVouchers();
  }, []);

  const fetchOrderSummary = async () => {
    setLoading(true); 
    try {
      const response = await axios.get(
        `http://192.168.1.13:3129/api/product/summary/${userId}/${selectedSlot?._id}/${addressId}`
      );
      const data = response?.data?.data;
      setTotalAmount(data?.totalWithDelivery || 0);
      setBagValue(data?.totalAmount || 0);
      setDeliveryCharge(data?.deliveryCharge || 0);
      setFinalAmount(data?.finalAmount || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://44.196.192.232:3129/api/voucher/get");
      if (response.data.success) {
        setVouchers(response.data.data);
        setAvailableVouchers(response.data.data.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />
      <div className="paymentcheckout">
        <div className="paymentcheckout-container">
          <div className="paymentcheckout-banner">
            <h1>Order Summary</h1>
          </div>
          <div className="order-summary container">
            <div className="order-detail">
              <h1 className="order-summary-title">Order Summary</h1>
              <div className="order-items">
                <div className="order-name">
                  <h3 style={{ color: "black", marginBottom: "10px", fontWeight: 500 }}>
                    Bag Value
                  </h3>
                  <h3 style={{ color: "black", marginBottom: "10px", fontWeight: 500 }}>
                    Delivery Charges
                  </h3>
                  <h3 style={{ color: "black", marginBottom: "10px", fontWeight: 500 }}>
                    Tax
                  </h3>
                </div>
                <div className="order-price">
                  <h4 style={{ marginBottom: "10px" }}>${bagValue.toFixed(3)}</h4>
                  <h4 style={{ marginBottom: "10px" }}>${deliveryCharge}</h4>
                  <h4 style={{ marginBottom: "10px" }}>
                    ${(totalAmount - bagValue - deliveryCharge).toFixed(2)}
                  </h4>
                </div>
              </div>
              <p className="order-description">
                Lorem Ipsum is simply dummy text of the printing industry's standard dummy text ever since the 1500s.
              </p>
            </div>
            <div className="order-total">
              <div className="order-coupon">
                <div className="coupon-about">
                  <i className="bx bxs-discount coupon-icon"></i>
                  <div className="coupon-text">
                    <h2
                      style={{
                        color: isCouponApplied ? "gray" : "black",
                        textDecoration: isCouponApplied ? "line-through" : "none",
                      }}
                    >
                      Apply Voucher
                    </h2>
                    <p
                      style={{
                        color: isCouponApplied ? "gray" : "#ff0000",
                        fontWeight: "bold",
                      }}
                    >
                      {isCouponApplied && selectedVoucherDiscount
                        ? `${availableVouchers} available - ${selectedVoucherDiscount}% off`
                        : `${availableVouchers} coupons available`}
                    </p>
                  </div>
                </div>
                <select
                  value={selectedVoucher}
                  onChange={(e) => setSelectedVoucher(e.target.value)}
                  disabled={isCouponApplied}
                  className="voucher-select"
                >
                  <option value="" disabled>Select a voucher</option>
                  {vouchers.map((voucher) => (
                    <option key={voucher._id} value={voucher.code}>
                      {voucher.code} ({voucher.discountValue}% off)
                    </option>
                  ))}
                </select>
              </div>
              <div className="coupon-select">
                <button
                  className="select-button"
                  onClick={applyCoupon}
                  disabled={isCouponApplied}
                  style={{
                    color: isCouponApplied ? "gray" : "white",
                    backgroundColor: isCouponApplied ? "#e0e0e0" : "red",
                    cursor: isCouponApplied ? "not-allowed" : "pointer",
                  }}
                >
                  {isCouponApplied ? "Coupon Applied" : "Apply Coupon"}
                </button>
              </div>
              <div className="total-saving">
                <h3>Total Savings</h3>
                <h5>${savings}</h5>
              </div>
              <div className="order-total-price">
                <h2 style={{ color: "black" }}>Total Amount Payable</h2>
                <h2 style={{ color: "black" }}>${totalAmount.toFixed(2)}</h2>
              </div>
            </div>
            <Link to="/payment">
              <button className="payment-button">Proceed to Payment</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentCheckout;
