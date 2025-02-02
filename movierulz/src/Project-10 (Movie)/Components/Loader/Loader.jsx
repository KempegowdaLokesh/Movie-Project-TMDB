import React from "react";
import "./Loader.css";

const Loader = ({ showText = true }) => {
  return (
    <div className="loading-overlay">
      <div className="loader">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        {showText && <span className="loading-text">Loading...</span>} 
      </div>
    </div>
  );
};

export default Loader;
