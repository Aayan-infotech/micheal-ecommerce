import React, { useEffect, useState } from "react";
import "./frozenfoods.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CarsouelSection from "./carsouelsection/carsouelsection";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import blankImage from "../../images/blank_image.jpg";
import Loading from "../loader/Loading";

function FrozenFoods() {
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
    <div className="frozenfoods">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="frozenfoods-container">
            <div className="frozenfoods-banner">
              <h1>All In One Place</h1>
              <h1>For</h1>
              <h1>Frozen Foods.</h1>
              <p className="frozenfoods-para">
              Discover premium cosmetics and high-quality dry & frozen foods, all in one place
              </p>
              {!token && (
                <Link to="/register" className="logo">
                  <button className="fronzenfoods">Sign Up</button>
                </Link>
              )}
            </div>

            <div className="frozenfoods-discounts container">
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
                  // <Link to={`/sub-category/${sub_cat}`} key={index}>
                  <div
                    className="carousel-slide"
                    style={{cursor:"pointer"}}
                    onClick={() => handleSubCategory(sub_cat)}
                    key={index}
                  >
                    <img
                      src={sub_cat?.image || blankImage}
                      alt={sub_cat?.title || "no image"}
                    />
                    <div className="carousel-text">
                      <h2 className="legend1"> {sub_cat?.title || "N/A"} </h2>
                    </div>
                  </div>
                  // </Link>
                ))}
              </Carousel>
            </div>
            <CarsouelSection categoriesProduct={categoriesProduct} />
          </div>
        </>
      )}
    </div>
  );
}

export default FrozenFoods;
