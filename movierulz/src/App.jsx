import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Project-10 (Movie)/Components/Navbar/Navbar";
import Footer from "./Project-10 (Movie)/Components/Footer/Footer";
import CastDetails from "./Project-10 (Movie)/Pages/Cast/CastDetails";
import MoviePage from "./Project-10 (Movie)/Pages/MoviePage/MoviePage";
import Home from "./Project-10 (Movie)/Pages/Home/Home";
import LoginPage from "./Project-10 (Movie)/Pages/Login/Login"; // Import LoginPage
import { DarkModeProvider } from "../src/context/DarkModeContext";

const AboutPage = () => <h1>About Us</h1>;
const ContactPage = () => <h1>Contact Us</h1>;

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <div className="main-content">
                  <Routes>
                    <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                    <Route path="/about" element={<ProtectedRoute element={<AboutPage />} />} />
                    <Route path="/contact" element={<ProtectedRoute element={<ContactPage />} />} />
                    <Route path="/movie/:id" element={<ProtectedRoute element={<MoviePage />} />} />
                    <Route path="/cast/:castId" element={<ProtectedRoute element={<CastDetails />} />} />
                  </Routes>
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
};

export default App;
