import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"; 
import "./Home.css";
import Pagination from "../../Components/Pagination/Pagination";
import Card from "../../Components/Card/Card";
import Loader from "../../Components/Loader/Loader";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const api_key = "7ddeab7e9f7c99d207e10ac678bc4553";
  const Base_Url = "https://api.themoviedb.org/3";
  const image_url = "https://image.tmdb.org/t/p/original"; 

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  const fetchMovies = async (query = "", page = 1) => {
    try {
      setLoading(true);
      const endpoint = query ? `${Base_Url}/search/movie` : `${Base_Url}/discover/movie`;

      const params = {
        api_key,
        page,
        ...(query && { query }),
      };

      const response = await axios.get(endpoint, { params });
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="home-container">
      {/* <h1 className="home-head">Discover Movies Based on Your Search...</h1> */}
      <h1 className="home-head">Movies That Fit Your Search Criteria....</h1>
      {loading ? (
        <Loader showText={false} />
      ) : (
        <>
          <div className="movie-list">
            {movies.length > 0 ? (
              movies.map((item) => (
                <Card key={item.id} movie={item} image_url={image_url} />
              ))
            ) : (
              <p>No movies found. Try searching for something else.</p>
            )}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
