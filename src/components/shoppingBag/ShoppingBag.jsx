import React, { useEffect, useState } from "react";
import "./shoppingbag.css";
import shoppingImg from "../../images/shopping-first.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShoppingBag() {
  const location = useLocation();
  const navigate = useNavigate();
  const { productItem } = location.state || {}; // For single product
  const { productItems } = location.state || []; // For multiple products (Buy All)
  const [quantities, setQuantities] = useState({}); // To track quantities of each product

  useEffect(() => {
    // Initialize quantities for each product
    if (productItem) {
      setQuantities({ [productItem.product._id]: productItem.quantity || 1 });
    } else if (productItems) {
      const initialQuantities = productItems.reduce((acc, item) => {
        acc[item.product._id] = item.quantity || 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [productItem, productItems]);

  const getShortDescription = (description) => {
    const words = description?.split(" ");
    return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : description;
  };

  const handleQuantityChange = async (productId, action) => {
    const userId = sessionStorage.getItem("userId");
    if (!productId || !userId) {
      toast.error("Product ID or User ID is missing!", {
        autoClose: 1000,
      });
      return;
    }

    try {
      const response = await axios.put(
        "http://44.196.192.232:3129/api/cart/change",
        {
          productId: productId,
          operation: action,
          userId: userId,
        }
      );

      if (response.data.success) {
        setQuantities((prevQuantities) => {
          const updatedQuantity = action === "increase" ? prevQuantities[productId] + 1 : prevQuantities[productId] - 1;
          return {
            ...prevQuantities,
            [productId]: Math.max(1, updatedQuantity),
          };
        });

        toast.success(
          action === "increase" ? "Quantity increased successfully!" : "Quantity decreased successfully!",
          { autoClose: 1000 }
        );
      } else {
        toast.error(response.data.message, {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the quantity.", {
        autoClose: 1000,
      });
    }
  };

  // Calculate the subtotal for the items in the bag
  const calculateSubtotal = () => {
    if (productItem) {
      return (productItem.product.price * quantities[productItem.product._id]).toFixed(2);
    } else if (productItems && productItems.length > 0) {
      return productItems.reduce((total, item) => {
        return total + item.product.price * quantities[item.product._id];
      }, 0).toFixed(2);
    }
    return 0;
  };

  const handleCheckout = () => {
    navigate("/shopcheckout", {
      state: {
        productItems: productItem ? [productItem] : productItems, // Pass the selected products
      },
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="shoppingbag">
        <div className="shoppingbag-container">
          <div className="shoppingbag-banner">
            <h1>Shopping Bag</h1>
          </div>
        </div>
        <div className="shopping-cards container section">
          {/* Single product */}
          {productItem && (
            <div className="shopping-card-first">
              <div className="shopping-first-img">
                <p
                  style={{
                    color: "black",
                    fontSize: "1.1rem",
                    marginBottom: "10px",
                  }}
                >
                  {productItem?.product?.name}
                </p>
                <img
                  src={productItem?.product?.image || shoppingImg}
                  alt={productItem?.product?.name}
                />
              </div>
              <div className="shopping-first-text">
                <h5>{getShortDescription(productItem?.product?.description)}</h5>
                <p>${productItem?.product?.price}</p>
                <div className="shopping-pricing">
                  <button
                    onClick={() => handleQuantityChange(productItem.product._id, "decrease")}
                  >
                    -
                  </button>
                  <button>{quantities[productItem.product._id]}</button>
                  <button
                    onClick={() => handleQuantityChange(productItem.product._id, "increase")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Multiple products */}
          {productItems &&
            productItems.map((item, index) => (
              <div className="shopping-card-first" key={index}>
                <div className="shopping-first-img">
                  <p
                    style={{
                      color: "black",
                      fontSize: "1.1rem",
                      marginBottom: "10px",
                    }}
                  >
                    {item?.product?.name}
                  </p>
                  <img src={item?.product?.image || shoppingImg} alt={item?.product?.name} />
                </div>
                <div className="shopping-first-text">
                  <h5>{getShortDescription(item?.product?.description)}</h5>
                  <p>${item?.product?.price}</p>
                  <div className="shopping-pricing">
                    <button
                      onClick={() => handleQuantityChange(item.product._id, "decrease")}
                    >
                      -
                    </button>
                    <button>{quantities[item.product._id]}</button>
                    <button
                      onClick={() => handleQuantityChange(item.product._id, "increase")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {/* Total Section */}
          <div className="shopping-card-second">
            <div className="shopping-pricing-total">
              <div className="shopping-items">
                <p>Your Bag</p>
                <p>
                  Subtotal ({productItem ? quantities[productItem.product._id] : productItems.length}{" "}
                  {productItem ? "Item" : "Items"}):
                </p>
              </div>
              <h5>${calculateSubtotal()}</h5>
            </div>
            <button type="submit" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingBag;
