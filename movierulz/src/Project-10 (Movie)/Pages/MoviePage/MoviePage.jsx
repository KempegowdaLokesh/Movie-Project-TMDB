import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Youtube from "react-youtube";
import Loader from "../../Components/Loader/Loader";
import "./MoviePage.css";

const MoviePage = () => {
    const [specificMovie, setSpecificMovie] = useState({});
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const image_url = "https://image.tmdb.org/t/p/original";

    const opts = {
        height: '390',
        width: '640',
        playerVars: { autoplay: 1 },
    };

    useEffect(() => {
        setLoading(true);

        Promise.all([
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7ddeab7e9f7c99d207e10ac678bc4553`)
                .then((res) => res.json())
                .then((data) => setSpecificMovie(data)),

            fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=7ddeab7e9f7c99d207e10ac678bc4553`)
                .then((res) => res.json())
                .then((data) => setCast(data.cast.slice(0, 10)))
        ])
        .then(() => setLoading(false))
        .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    }, [id]);

    const fetchTrailer = (movieId) => {
        setIsTrailerOpen(true);
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7ddeab7e9f7c99d207e10ac678bc4553`)
            .then((res) => res.json())
            .then((data) => {
                if (data.results && data.results.length > 0) {
                    setTrailer(data.results[0]?.key);
                    
                    if (window.innerWidth <= 425) {
                        setTimeout(() => {
                            const videoContainer = document.querySelector(".modal-content");
                            if (videoContainer.requestFullscreen) {
                                videoContainer.requestFullscreen();
                            } else if (videoContainer.webkitRequestFullscreen) {
                                videoContainer.webkitRequestFullscreen();
                            } else if (videoContainer.msRequestFullscreen) {
                                videoContainer.msRequestFullscreen();
                            }
                        }, 500);
                    }
                } else {
                    alert('No trailer available.');
                }
            })
            .catch((error) => {
                console.error('Error fetching trailer:', error);
                alert('Error fetching trailer.');
            });
    };

    const handleCloseTrailer = () => {
        setIsTrailerOpen(false);
        if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
            document.exitFullscreen?.();
            document.webkitExitFullscreen?.();
            document.msExitFullscreen?.();
        }
    };

    return (
        <div className="movie-container">
            {loading ? (
                <Loader showText={false} />
            ) : (
                <>
                    <div className="movie-images">
                        <center>
                            {specificMovie?.backdrop_path ? (
                                <img src={`${image_url}${specificMovie.backdrop_path}`} 
                                     alt={specificMovie.original_title || 'Movie Image'} />
                            ) : (
                                <p>Image not available</p>
                            )}
                        </center>
                    </div>

                    <div className="movie-info">
                        <h1>{specificMovie?.original_title || 'Loading...'}</h1>
                        <p>{specificMovie?.overview || 'No description available.'}</p>
                        <p><strong>Genres:</strong> {specificMovie?.genres?.map(genre => genre.name).join(", ") || 'N/A'}</p>
                        <p><strong>Release Date:</strong> {specificMovie?.release_date || 'N/A'}</p>
                        <p><strong>Rating:</strong> {specificMovie?.vote_average || 'N/A'}</p>
                        <button className="trailer-button" onClick={() => fetchTrailer(id)}>Watch Trailer</button>
                    </div>

                    <div className="movie-cast">
                        <h2>Cast</h2>
                        <div className="cast-list">
                            {cast.map((actor) => (
                                <div key={actor.id} className="cast-item"
                                    onClick={() => navigate(`/cast/${actor.id}`)}>
                                    <img src={actor.profile_path ? `${image_url}${actor.profile_path}` : 'https://via.placeholder.com/150'}
                                         alt={actor.name} />
                                    <p className="cast-name">{actor.name}</p>
                                    <p className="cast-character">as {actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {isTrailerOpen && (
                        <div className="trailer-modal">
                            <div className="modal-content">
                                <button className="close-button" onClick={handleCloseTrailer}>Close</button>
                                {trailer && <Youtube videoId={trailer} opts={opts} />}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MoviePage;
