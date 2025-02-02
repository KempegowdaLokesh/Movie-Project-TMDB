// src/Project-10 (Movie)/Components/Pagination/Pagination.jsx
import React from 'react';
import './Pagination.css'; // Create a CSS file for pagination styling


const Pagination = ({ currentPage, totalPages, handleNext, handlePrev }) => {
  return (
    <div className="pagination">
      <button 
        onClick={handlePrev} 
        disabled={currentPage === 1} 
        className="pagination-button"
      >
        Prev
      </button>
      <span className="pagination-info">{currentPage}/{totalPages}</span>
      <button 
        onClick={handleNext} 
        disabled={currentPage === totalPages} 
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
