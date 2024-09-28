import React, { useEffect, useState } from "react";
import "./shoppingbag.css";
import shoppingImg from "../../images/shopping-first.jpg";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShoppingBag() {
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const { productItem } = location.state || {};
    const productId = productItem?.product?._id;
    const userId = sessionStorage.getItem("userId");
    const navigate = useNavigate();

    useEffect(() => {
        if (productItem?.product?.quantity) {
            setQuantity(productItem.product.quantity);
        }
    }, [productItem]);

    const getShortDescription = (description) => {
        const words = description?.split(" ");
        if (words.length > 20) {
            return words.slice(0, 20).join(" ") + "...";
        }
        return description;
    };

    // Function to handle increasing or decreasing quantity
    const handleQuantityChange = async (action) => {
        try {
            const response = await axios.put("http://44.196.192.232:3129/api/cart/change", {
                productId: productId,
                operation: action,
                userId: userId
            });
            if (response.data.success) {
                if (action === 'increase') {
                    setQuantity(quantity + 1);
                    toast.success("Quantity increased successfully!", {
                        autoClose: 1000
                    });
                } else if (action === 'decrease' && quantity > 1) {
                    setQuantity(quantity - 1);
                    toast.success("Quantity decreased successfully!", {
                        autoClose: 1000
                    });
                }
            } else {
                toast.error(response.data.message, {
                    autoClose: 1000
                });
            }
        } catch (error) {
            toast.error(error, {
                autoClose: 1000
            });
        }
    };

    const subtotal = (productItem?.product?.price * quantity).toFixed(2);

    const handleCheckout = () => {
        navigate('/shopcheckout', { state: { productItem : productItem } });
        // { state: { selectedSlot, addressId: selectedAddressId } }
    }

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
                    <div className="shopping-card-first">
                        <div className="shopping-first-img">
                            <p style={{ color: 'black', fontSize: '1.1rem', marginBottom: '10px' }}>
                                {productItem?.product?.name}
                            </p>
                            <img src={productItem?.product?.image || shoppingImg} alt="" />
                        </div>
                        <div className="shopping-first-text">
                            <h5>{getShortDescription(productItem?.product?.description)}</h5>
                            <p>${productItem?.product?.price}</p>
                            <div className="shopping-pricing">
                                <button onClick={() => handleQuantityChange('decrease')}>-</button>
                                <button>{productItem?.quantity}</button>
                                <button onClick={() => handleQuantityChange('increase')}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className="shopping-card-second">
                        <div className="shopping-pricing-total">
                            <div className="shopping-items">
                                <p>Your Bag</p>
                                <p>Subtotal ({productItem?.quantity} Item{quantity !== 1 ? 's' : ''}):</p>
                            </div>
                            <h5>${subtotal}</h5>
                        </div>
                        <button type="submit" onClick={handleCheckout}>Checkout
                            {/* <Link to="/shopcheckout" className="checkout">Checkout</Link> */}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShoppingBag;
