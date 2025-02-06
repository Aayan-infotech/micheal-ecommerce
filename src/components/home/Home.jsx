import React, { useEffect, useState } from "react";
import "./home.css";
import fastfood from "../../images/fast-food 2.png";
import outline from "../../images/outline.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [categoryType, setCategoryType] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchAllCategoriesType();
  }, []);

  const fetchAllCategoriesType = async () => {
    try {
      const response = await axios.get(
        "https://ecom.atulrajput.tech/api/category/get"
      );
      setCategoryType(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const dryFrozenFoods = categoryType.find(
    (category) =>
      category.title.includes("Dry Foods") ||
      category.title.includes("Frozen Foods")
  );

  const cosmeticsProducts = categoryType.find((category) =>
    category.title.includes("Cosmetics Products")
  );

  const handleNavigation = (category) => {
    if (category.title.includes("Dry Foods")) {
      navigate("/dryfoods/frozenfoods", { state: { categoryData: category } });
    } else {
      navigate("/cosmeticsproducts", { state: { categoryData: category } });
    }
  };

  return (
    <div className="home">
      <div className="contain">
        <div className="home-top">
          <h1>All In One Place For Frozen Foods And Cosmetics</h1>
          <p>
          Discover premium cosmetics and high-quality dry & frozen foods, all in one place 
          </p>
          {!token && (
            <Link to="/register" className="logo">
              <button>Sign Up</button>
            </Link>
          )}
        </div>
        <div className="home-bottom">
          <div className="store">
            <span className="frozen-img"></span>
            <p
              className="frozenp"
              onClick={() => handleNavigation(dryFrozenFoods)}
            >
              <img src={fastfood} alt="" />
              Visit Store<i className="bx bx-right-arrow-alt"></i>
            </p>
          </div>
          <span></span>
          <div className="store">
            <span className="cosemetic-img"></span>
            <p
              className="cosemeticp"
              onClick={() => handleNavigation(cosmeticsProducts)}
            >
              <img src={outline} alt="" />
              Visit Store<i className="bx bx-right-arrow-alt"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
