import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDarkMode } from '../../../context/DarkModeContext';
import Loader from '../../Components/Loader/Loader'; // Import the Loader component

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    
    // Update the URL to include the search query
    navigate(query.trim() ? `/?search=${encodeURIComponent(query)}` : '/');
  };

  const handleLinkClick = (path) => {
    if (path === window.location.pathname) return; // Prevent reload if already on the same page

    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 1000);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login status
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : ''}`}>
      <Link className="logo animated-logo" to="/">🎞️ ScreenTrail</Link>

      {/* Show Loader when loading */}
      {loading && <Loader />}

      <div className={`menu ${isMenuActive ? 'active' : ''}`}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
        <ul>
          <li><Link to="/" onClick={() => handleLinkClick('/')}>Home</Link></li>
          <li><Link to="/about" onClick={() => handleLinkClick('/about')}>About</Link></li>
          <li><Link to="/contact" onClick={() => handleLinkClick('/contact')}>Contact</Link></li>
        </ul>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;
