import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Project-10 (Movie)/Components/Navbar/Navbar";
import Footer from "./Project-10 (Movie)/Components/Footer/Footer";
import CastDetails from "./Project-10 (Movie)/Pages/Cast/CastDetails";
import MoviePage from "./Project-10 (Movie)/Pages/MoviePage/MoviePage";
import Home from "./Project-10 (Movie)/Pages/Home/Home";
import LoginPage from "./Project-10 (Movie)/Pages/Login/Login"; // Import LoginPage
import About from "./Project-10 (Movie)/Pages/About/About"; // Import About Page
import Contact from "./Project-10 (Movie)/Pages/Contact/Contact"; // Import Contact Page
import { DarkModeProvider } from "../src/context/DarkModeContext";

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              isLoggedIn ? (
                <>
                  <Navbar />
                  <div className="main-content">
                    <Routes>
                      <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                      <Route path="/movie/:id" element={<ProtectedRoute element={<MoviePage />} />} />
                      <Route path="/cast/:castId" element={<ProtectedRoute element={<CastDetails />} />} />
                      <Route path="/about" element={<ProtectedRoute element={<About />} />}/>
                      <Route path="/contact" element={<ProtectedRoute element={<Contact />} />}/>
                    </Routes>
                  </div>
                  <Footer />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
};

export default App;

// Ensure you create a "public/_redirects" file with the following content:
// /* /index.html 200
