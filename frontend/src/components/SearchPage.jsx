import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("city"); // Default search type
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log("api called ");
      const res = await axios.get(
        `http://localhost:4000/api/breweries/search?${searchType}=${searchTerm}`
      );
      console.log("after api called ");
      if (res.status === 500) {
        return alert("Server Error");
      }

      // Assuming you want to navigate to a search results page
      navigate("/search-results", { state: { breweries: res.data } });
    } catch (err) {
      alert(err.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <div>
      <h2>Search</h2>
      <form onSubmit={handleSearch}>
        <label htmlFor="searchTerm">Search Term:</label>
        <input
          type="text"
          id="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label htmlFor="searchType">Search By:</label>
        <select
          id="searchType"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="city">city</option>
          <option value="name">name</option>
          <option value="type">type</option>
          {/* Add more options as needed */}
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchPage;
