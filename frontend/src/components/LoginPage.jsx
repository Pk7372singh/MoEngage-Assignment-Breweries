import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   axios
  //     .post("http://localhost:4000/api/auth/login", { username, password })
  //     .then((response) => {
  //       console.log(response);
  //       console.log("Login successful");
  //       // Redirect or perform actions after successful login
  //       history.push("/");
  //     })
  //     .catch((error) => {
  //       console.error("Login error:", error);
  //       // Handle login error (display message, etc.)
  //     });
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("api called ");
      console.log(password);
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        username,
        password,
      });
      console.log("after api called ");
      if (res.status === 400) {
        return alert("Wrong credientials");
      }

      navigate("/search");
      // setMessage(res.data.msg);
      // Store the token in local storage
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div style={styles.loginContainer}>
      <h2>Login</h2>
      <div style={styles.inputGroup}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleLogin} style={styles.loginButton}>
        Login
      </button>
    </div>
  );
};

// Inline styles object
const styles = {
  loginContainer: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  inputGroup: {
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  loginButton: {
    width: "100%",
    padding: "0.75rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default LoginPage;
