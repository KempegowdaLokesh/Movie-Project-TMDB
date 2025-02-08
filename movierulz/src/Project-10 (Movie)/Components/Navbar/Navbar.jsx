import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDarkMode } from '../../../context/DarkModeContext';
import Loader from '../../Components/Loader/Loader'; // Import the Loader component

const Navbar = ({ resetPagination }) => {  // Accept resetPagination as a prop
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuActive(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/?search=${encodeURIComponent(search)}`);
      closeMenu(); // Close menu on search submit
    }
  };

  const handleLinkClick = (path) => {
    if (path === "/") {
      setSearch(""); // Clear search input when navigating home
      resetPagination();  // Reset pagination when going to homepage
      navigate("/", { replace: true }); // Always navigate home
      closeMenu(); // Close menu on selection
      return;
    }

    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
      closeMenu(); // Close menu after navigation
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login status
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : ''}`}>
      {/* Ensure that logo link navigates to Home and resets pagination */}
      <Link
        className="logo animated-logo"
        to="/"
        onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          handleLinkClick('/'); // Trigger the home link with reset pagination
        }}
      >
        🎞️ ScreenTrail
      </Link>

      {/* Show Loader when loading */}
      {loading && <Loader />}

      <div className={`menu ${isMenuActive ? 'active' : ''}`}>
        <label htmlFor="search"></label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search for a movie"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit} // Close menu when pressing Enter
          className="search-input"
        />
        <ul>
          <li><Link to="/" onClick={() => handleLinkClick('/')}>Home</Link></li>
          <li><Link to="/about" onClick={() => handleLinkClick('/about')}>About</Link></li>
          <li><Link to="/contact" onClick={() => handleLinkClick('/contact')}>Contact</Link></li>
        </ul>
      </div>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
        <span className="user-icon">👤</span>
        {showDropdown && (
          <div className="dropdown-menu">
            <li onClick={handleLogout}>Logout</li>
          </div>
        )}
      </div>

      <button onClick={toggleDarkMode} className="icon-dark-mode-toggle">
        {isDarkMode ? '🌞' : '🌙'}
      </button>

      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <div className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
