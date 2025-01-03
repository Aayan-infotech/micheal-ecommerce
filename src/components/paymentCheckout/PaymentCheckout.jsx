import React, { useEffect, useState } from "react";
import "./paymentcheckout.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/loader/Loading";

function PaymentCheckout() {
  const [getVoucher, setGetVoucher] = useState(null);
  const [appliedVoucherId, setAppliedVoucherId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [savings, setSavings] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [taxSanctionedAmount, setTaxSanctionedAmount] = useState(0);
  const [bagValue, setBagValue] = useState(0);
  const [vouchers, setVouchers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSlot, addressId } = location.state || {};
  const userId = sessionStorage.getItem("userId");

  const fetchOrderSummary = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://44.196.64.110:3129/api/product/summary/${userId}/${selectedSlot?._id}`
      );
      const data = response?.data?.data;
      setGetVoucher(data?.voucher);
      setTotalAmount(data?.totalAmount || 0);
      setBagValue(data?.productTotalCost || 0);
      setDeliveryCharge(data?.deliverySlot?.deliveryCharge || 0);
      setTaxSanctionedAmount(data?.taxSanctionedAmount || 0);
      setSavings(data?.totalSavings || 0);
      setAppliedVoucherId(data?.voucher?._id || "");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://44.196.64.110:3129/api/voucher/get"
      );
      if (response.data.success) {
        setVouchers(response.data.data);
        setAppliedVoucherId(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const applyCoupon = async (voucher) => {
    try {
      const response = await axios.put(
        `http://44.196.64.110:3129/api/voucher/apply/${voucher?._id}/${userId}`,
        {
          code: voucher.code,
          purchaseAmount: totalAmount,
        }
      );
      if (response.data.success) {
        const discountValue = response.data.discountValue;
        const discount = totalAmount * (discountValue / 100);
        const updatedSavings = parseFloat(discount.toFixed(2));
        const updatedTotalAmount = parseFloat(
          (totalAmount - discount).toFixed(2)
        );
        setSavings(updatedSavings);
        setTotalAmount(updatedTotalAmount);
        setAppliedVoucherId(voucher?._id);
        toast.success(
          response.data.message || "Voucher applied successfully!",
          { autoClose: 1000 }
        );
        fetchOrderSummary();
      } else {
        toast.error(response.data.message || "Failed to apply the voucher.", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Error: ${errorMessage}`, { autoClose: 1000 });
      console.error("Error applying coupon:", errorMessage);
    }
  };

  useEffect(() => {
    fetchOrderSummary();
    fetchVouchers();
  }, []);

  if (loading) {
    return <Loading />;
  }
  const handleToProceed = () => {
    navigate("/payment", {
      state: {
        selectedSlot,
        addressId,
        getVoucher
      },
    });
  };

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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <h3
                    style={{
                      color: "black",
                      marginBottom: "10px",
                      fontWeight: 500,
                    }}
                  >
                    Bag Value
                  </h3>
                  <h4>${bagValue.toFixed(2)}</h4>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <h3
                    style={{
                      color: "black",
                      marginBottom: "10px",
                      fontWeight: 500,
                    }}
                  >
                    Delivery Charges
                  </h3>
                  <h4>${deliveryCharge}</h4>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <h3
                    style={{
                      color: "black",
                      marginBottom: "10px",
                      fontWeight: 500,
                    }}
                  >
                    Tax
                  </h3>
                  <h4>{taxSanctionedAmount.toFixed(2)} %</h4>
                </div>
              </div>
              <p className="order-description">
                Lorem Ipsum is simply dummy text of the printing industry's
                standard dummy text ever since the 1500s.
              </p>
            </div>
            <div className="order-total">
              <h3 style={{ marginBottom: "10px", color: "black" }}>
                Available Offers
              </h3>
              {vouchers?.map((voucher, index) => (
                <div key={index}>
                  <p
                    style={{
                      color:
                        appliedVoucherId === voucher._id ? "grey" : "black",
                    }}
                  >
                    Offers <b>{voucher.code}</b> ({voucher?.discountValue}% off
                    - valid until{" "}
                    {new Date(voucher?.expiryDate).toISOString().split("T")[0]}){" "}
                    {appliedVoucherId === voucher._id ? (
                      <span style={{ color: "grey" }}>Applied</span>
                    ) : (
                      <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => applyCoupon(voucher)}
                      >
                        Apply
                      </span>
                    )}
                  </p>
                </div>
              ))}
              <div className="total-saving">
                <h3>Total Savings</h3>
                <h5>${savings.toFixed(2)}</h5>
              </div>
              <div className="order-total-price">
                <h2
                  style={{
                    color: "black",
                    marginBottom: "10px",
                    fontWeight: 500,
                  }}
                >
                  Total Amount Payable
                </h2>
                <h2
                  style={{
                    color: "black",
                    marginBottom: "10px",
                    fontWeight: 500,
                  }}
                >
                  ${(totalAmount - savings).toFixed(2)}
                </h2>
              </div>
            </div>
            <button className="payment-button" onClick={handleToProceed}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentCheckout;
