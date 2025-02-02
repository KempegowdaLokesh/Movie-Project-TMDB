import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from "../../Components/Loader/Loader"; // Import Loader
import "./CastDetails.css";

const CastDetails = () => {
    const [castDetails, setCastDetails] = useState(null);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const { castId } = useParams(); // Get Cast ID from URL
    const image_url = "https://image.tmdb.org/t/p/original";
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true); // Show loader before fetching

        Promise.all([
            fetch(`https://api.themoviedb.org/3/person/${castId}?api_key=7ddeab7e9f7c99d207e10ac678bc4553`)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to fetch cast details");
                    return res.json();
                })
                .then((data) => setCastDetails(data))
                .catch((error) => {
                    console.error('Error fetching cast details:', error);
                    setCastDetails(null);
                }),

            fetch(`https://api.themoviedb.org/3/person/${castId}/movie_credits?api_key=7ddeab7e9f7c99d207e10ac678bc4553`)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to fetch movie credits");
                    return res.json();
                })
                .then((data) => setRelatedMovies(data.cast || [])) // Ensure it's always an array
                .catch((error) => {
                    console.error('Error fetching movie credits:', error);
                    setRelatedMovies([]);
                })
        ])
        .finally(() => setLoading(false)); // Hide loader after fetching
    }, [castId]);

    return (
        <>
            {loading ? ( 
                <Loader showText={false} /> // Pass showText={false} to hide loading text
            ) : castDetails ? (
                <div className="cast-details-container">
                    {/* Cast Info */}
                    <div className="cast-info">
                        <img
                            src={castDetails.profile_path ? `${image_url}${castDetails.profile_path}` : 'https://placehold.co/300'}
                            alt={castDetails.name}
                        />
                        <div className="cast-details">
                            <h1>{castDetails.name}</h1>
                            <p><strong>Biography:</strong> {castDetails.biography || 'No biography available.'}</p>
                            <p><strong>Birthday:</strong> {castDetails.birthday || 'N/A'}</p>
                            <p><strong>Place of Birth:</strong> {castDetails.place_of_birth || 'N/A'}</p>
                        </div>
                    </div>

                    {/* Related Movies */}
                    <div className="related-movies">
                        <h2>Movies Featuring {castDetails.name}</h2>
                        <div className="related-movies-list">
                            {relatedMovies.length > 0 ? (
                                relatedMovies.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="related-movie-item"
                                        onClick={() => navigate(`/movie/${movie.id}`)}
                                    >
                                        <img
                                            src={
                                                movie.poster_path
                                                    ? `${image_url}${movie.poster_path}`
                                                    : 'https://placehold.co/150'
                                            }
                                            alt={movie.title}
                                        />
                                        <p>{movie.title}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No related movies found.</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Error fetching cast details. Please try again.</p>
            )}
        </>
    );
};

export default CastDetails;
