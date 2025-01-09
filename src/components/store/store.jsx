import React, { useEffect, useState } from "react";
import "./store.css";
import BeautyCarsouel from "../store/frozenFoodCarsouel/frozenFoodCarsouel";
import FoodCarsouel from "../store/beautyFoodCarsouel/beautyFoodCarsouel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from '../loader/Loading';

function Store() {
  const [categoryType, setCategoryType] = useState([]);
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCategoriesType();
  }, []);

  const fetchAllCategoriesType = async () => {
    try {
      const response = await axios.get('https://www.millysshop.se/api/category/get');
      console.log(response?.data?.data, 'response?.data?.data');
      setTitle(response?.data?.message);
      setCategoryType(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const dryFrozenFoods = categoryType.filter(category =>
    category.title.includes("Dry Foods") || category.title.includes("Frozen Foods")
  );

  const cosmeticsProducts = categoryType.filter(category =>
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
    <div className="store">
      {loading && <Loading />}
      {!loading && (
        <div className="store-container">
          <div className="first-store">
            <h1>Stores</h1>
            <p className="store-para" style={{ color: 'white' }}>
              {title?.message || 'All Categories'}
            </p>
          </div>
          <div className="container">
            <div className="second-store">
              {categoryType?.map((category, index) => (
                <div
                  key={index}
                  className="food-store"
                  onClick={() => handleNavigation(category)}
                >
                  <div className="food-sec">
                    <img src={category.image} alt={category.title} className="sec-store-img" />
                  </div>
                  <h2 className="frozen">{category.title}</h2>
                  <p>{category.title.includes("Frozen") ? "Edible" : "Skincare"}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Pass filtered data to each Carsouel */}
          <BeautyCarsouel categoryType={dryFrozenFoods} />
          <FoodCarsouel categoryType={cosmeticsProducts} />
        </div>
      )}
    </div>
  );
}

export default Store;
