import React, { useState, useEffect } from "react";
import axios from "axios";
import "./searchitems.css";

function SearchItems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length > 0) {
        setIsFirstLoad(false);
        try {
          const res = await axios.post(
            "http://3.223.253.106:3129/api/product/search",
            { name: debouncedQuery }
          );

          if (res.status === 200) {
            setSearchResults(res?.data?.data);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <div className="searchitems">
      <div className="searchitems-container">
        <div className="searchitems-banner">
          <h1>Search Items</h1>
        </div>
        <div className="searchitems-data">
          <div className="searchitems-nav"></div>
          <div className="searchitems-card container sec">
            <form className="searchfield" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Search any product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" style={{ background: "transparent" }}>
                <i className="bx bx-search"></i>
              </button>
            </form>

            <div className="search-results">
              {isFirstLoad ? (
                <div className="initial-message">
                  <p>Search for your favorite products!</p>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <div key={item._id} className="search-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <span>${item.price}</span>
                    </div>
                  </div>
                ))
              ) : (
                searchQuery && <p>No results found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchItems;
