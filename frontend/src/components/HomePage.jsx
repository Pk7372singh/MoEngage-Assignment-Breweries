import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to the Home Page</h1>
      <nav>
        <ul style={styles.navList}>
          <li>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" style={styles.link}>
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
};

// Inline styles object
const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "violet",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  navList: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    gap: "1rem",
  },
  link: {
    fontSize: "1.2rem", // Adjust the font size as needed
    textDecoration: "none",
    color: "white",
  },
};

export default HomePage;
