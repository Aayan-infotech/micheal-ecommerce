import React, { useState, useEffect } from "react";
import axios from "axios";
import "./searchitems.css";

function SearchItems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (searchQuery.length > 0) {
        const res = await axios.post(
          "http://3.111.163.2:3129/api/product/search",
          {
            name: searchQuery,
          }
        );

        if (res.status === 200) {
          console.log(res?.data?.data);
          setSearchResults(res?.data?.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="searchitems">
      <div className="searchitems-container">
        <div className="searchitems-banner">
          <h1>Search Items</h1>
        </div>
        <div className="searchitems-data">
          <div className="searchitems-nav"></div>
          <div className="searchitems-card container sec">
            <form className="searchfield" onSubmit={handleSearch}>
              <input type="text" placeholder="Search any product..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
              <button type="submit" style={{ background: "transparent" }}>
                <i className="bx bx-search"></i>
              </button>
            </form>

            <div className="search-results">
              {searchResults.length > 0
                ? searchResults.map((item) => (
                    <div key={item._id} className="search-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <span>${item.price}</span>
                      </div>
                    </div>
                  ))
                : searchQuery && <p></p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchItems;
