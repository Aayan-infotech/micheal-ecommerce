import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import Header from '../header/Header';
import axios from 'axios';

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://13.200.240.28:3003/api/category/get');
        setCategories(response.data.data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    localStorage.setItem("CategoryId", categoryId);
  };

  return (
    <>
      <div className="home">
        <div className="contain">
          <div className="home-top">
            <h1>All In One Place For Frozen Foods And Cosmetics</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <button>Sign Up</button>
          </div>
          <div className="home-bottom">
            {categories.map((category) => (
              <div className="store" key={category._id}>
                <span className="frozen-img"></span>
                <Link
                  to={`/${category.title.toLowerCase().replace(/\s/g, '')}`}
                  onClick={() => handleCategoryClick(category._id)} 
                >
                  <p className="frozenp">
                    <img src={category.image} alt={category.title} />
                    Visit Store<i className="bx bx-right-arrow-alt"></i>
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
