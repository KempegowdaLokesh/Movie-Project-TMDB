import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ====== CURSOR TRAIL EFFECT ======
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursorTrail = document.createElement("div");
      cursorTrail.className = "cursor-trail";
      cursorTrail.style.left = `${e.pageX}px`;
      cursorTrail.style.top = `${e.pageY}px`;
      document.body.appendChild(cursorTrail);
      setTimeout(() => cursorTrail.remove(), 500);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ====== SOUND EFFECT ON HOVER ======
  useEffect(() => {
    const loginBtn = document.querySelector(".login-btn");
    const hoverSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2245/2245-preview.mp3"); // Add your sound file

    const handleHover = () => hoverSound.play();

    if (loginBtn) {
      loginBtn.addEventListener("mouseenter", handleHover);
    }

    return () => {
      if (loginBtn) {
        loginBtn.removeEventListener("mouseenter", handleHover);
      }
    };
  }, []);

  // ====== AUTO-LOGOUT ON TAB CLOSE/REFRESH ======
  useEffect(() => {
    const handleUnload = () => localStorage.removeItem("isLoggedIn");
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  // ====== REDIRECT IF ALREADY LOGGED IN ======
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // ====== LOGIN FORM SUBMISSION ======
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (username === "Kempegowda Lokesh" && password === "Lokesh@143") {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        navigate("/");
      } else {
        setError("Invalid username or password");
        setLoading(false);
      }
    }, 2000); // Simulated delay for animation
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoComplete="off"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="off"
            />
          </div>
          <button type="submit" className={`login-btn ${loading ? "loading" : ""}`} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;