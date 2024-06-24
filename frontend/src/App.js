import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import LoginPage from "./components/LoginPage.jsx"; // Corrected the file name here
import SignupPage from "./components/SignupPage.jsx";
import SearchPage from "./components/SearchPage.jsx";
import SearchResultsPage from "./components/SearchResultsPage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
