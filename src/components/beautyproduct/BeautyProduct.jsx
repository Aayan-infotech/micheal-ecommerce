import React, { useEffect, useState } from "react";
import "./beautyproduct.css";
import { Carousel } from "react-responsive-carousel";
import blankImage from "../../images/blank_image.jpg";
import CarsouelSection from "./carsouelsection/carsouelsection";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../loader/Loading";

function BeautyProduct() {
  const [categoriesProduct, setCategoriesProduct] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subCategoryTitle, setSsbCategoryTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const categoryData = location.state?.categoryData;
  const storedCategoryId = categoryData?._id;

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (storedCategoryId) {
      fetchCategoriesProduct();
      fetchSubCategories();
    }
  }, [storedCategoryId]);

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        `https://ecom.atulrajput.tech/api/category/get/${storedCategoryId}`
      );
      setSsbCategoryTitle(response?.data?.data?.title);
      setSubCategory(response?.data?.subcategories);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching subcategories:", error);
    }
  };

  const fetchCategoriesProduct = async () => {
    try {
      const response = await axios.get(
        `https://ecom.atulrajput.tech/api/product/categoryproducts/${storedCategoryId}`
      );
      setCategoriesProduct(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSubCategory = (subCategoryProduct) => {
    navigate("/sub-category", {
      state: { subCategoryProduct: subCategoryProduct },
    });
  };

  return (
    <div className="beautyproduct">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="beautyproduct-container">
            <div className="beautyproduct-banner">
              <h1>All In One Place</h1>
              <h1>For</h1>
              <h1>Beauty Products.</h1>
              <p className="beautyproduct-para">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              {!token && (
                <Link to="/register" className="logo">
                  <button
                    type="submit"
                    style={{
                      padding: "15px 25px",
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "30px",
                    }}
                  >
                    Sign Up
                  </button>
                </Link>
              )}
            </div>
            <div className="container-box">
              <div className="beautyproduct-discounts">
                <h1 className="discounts-heading">{subCategoryTitle}!</h1>
                <Carousel
                  showArrows={true}
                  infiniteLoop={true}
                  showThumbs={false}
                  showStatus={false}
                  autoPlay={true}
                  interval={3000}
                  centerMode={true}
                  centerSlidePercentage={60}
                  showIndicators={false}
                  renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                      <button
                        type="button"
                        className="carousel-arrow prev"
                        onClick={onClickHandler}
                        title={label}
                      >
                        &lt;
                      </button>
                    )
                  }
                  renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                      <button
                        type="button"
                        className="carousel-arrow next"
                        onClick={onClickHandler}
                        title={label}
                      >
                        &gt;
                      </button>
                    )
                  }
                >
                  {subCategory?.map((sub_cat, index) => (
                    <div
                      className="carousel-slide"
                      key={index}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSubCategory(sub_cat)}
                    >
                      <img
                        src={sub_cat?.image || blankImage}
                        alt={sub_cat.title}
                        style={{
                          width: "100%",
                          maxHeight: "450px",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                      <div className="carousel-text">
                        <h2 className="legend1"> {sub_cat.title || "N/A"} </h2>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
              <CarsouelSection categoriesProduct={categoriesProduct} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BeautyProduct;
