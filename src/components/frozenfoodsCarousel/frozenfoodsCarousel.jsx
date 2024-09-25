import React, { useState, useEffect } from 'react';
import "./frozenfoodsCarousel.css";
import bannerImg from '../../images/Frozenfoods-first.png';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

function FrozenfoodsCarousel() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://44.196.192.232:3129/api/product/get/${productId}`);
                setProduct(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching product details');
                setLoading(false);
                console.error('Error fetching product details:', err);
            }
        };
        fetchProductDetails();
    }, [productId]);

    return (
        <div className="frozenfoodsCarousel">
            <div className="container section">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : product ? (
                    <>
                        <div className="cart-section">
                            <div className="left-cart-sec">
                                <img src={product?.image || bannerImg} alt={product?.name} />
                                {product?.discount > 0 && <p className="left-cart-para">{product?.discount}% off your order</p>}
                            </div>
                            <div className="right-cart-sec">
                                <h2 className="cart-head">{product?.name}</h2>
                                <p className="right-cart-para">{product?.description}</p>
                                <div className="right-cart-credential">
                                    <p className="right-cart-info">
                                        Available | <span className="star-rating"><i className="bx bxs-star"></i>{product?.rating || '4.8 (1.2k)'}</span>
                                    </p>
                                    <div className="right-cart-navi">
                                        <Link to="/cart" className="logo">
                                            <button className="right-cart-butt" type='button'>Buy</button>
                                        </Link>
                                        <p className="heart-icon"><i className="bx bx-heart"></i></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cart-about">
                            <h2 className="cart-head">{product?.name}</h2>
                            <p className="cart-about-summary">{product?.description}</p>
                        </div>
                        <div className="cart-links">
                            <h2 className="cart-head">Additional Information</h2>
                            <div className="cart-links-info">
                                <p className="cart-links-first">
                                    Category: {product?.category}
                                </p>
                                <h2 className="cart-head">Subcategory: {product?.subcategory}</h2>
                                <p className="cart-links-second">
                                    Stock: {product?.stock} available
                                </p>
                                <h2 className="cart-head">Price: ${product?.price}</h2>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>No product found.</div>
                )}
            </div>
        </div>
    );
}

export default FrozenfoodsCarousel;
