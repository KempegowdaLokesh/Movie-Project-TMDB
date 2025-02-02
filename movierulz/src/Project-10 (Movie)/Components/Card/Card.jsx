// src/Project-10 (Movie)/Components/Card/Card.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import './Card.css'; // Import the CSS for styling

const Card = ({ movie, image_url }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`${image_url}${movie.poster_path}`}
          alt={movie.original_title}
          className="movie-image"
        />
      </Link>
      <div className="movie-info">
        <h3 className="movie-title">{movie.original_title}</h3>
        <p className="movie-description">{movie.overview}</p>
        <p className="movie-rating"><strong>Rating:</strong> {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default Card;
