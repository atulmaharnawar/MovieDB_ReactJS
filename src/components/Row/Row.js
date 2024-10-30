import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/w500/";

function Row({ fetchUrl, query }) {
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const maxPages = 500; 

    console.log(location.pathname);

    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get('page')) || 1;

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const request = await axiosInstance.get(`${fetchUrl}&page=${currentPage}`);
                setMovies(request.data.results);
                setTotalPages(Math.min(request.data.total_pages, maxPages));
            } catch (err) {
                setError("An error occurred. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [fetchUrl, currentPage]);

    const handleClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            const newQueryParams = new URLSearchParams(location.search);
            newQueryParams.set('page', currentPage - 1);
            navigate(`${location.pathname}?${newQueryParams.toString()}`);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            const newQueryParams = new URLSearchParams(location.search);
            newQueryParams.set('page', currentPage + 1);
            navigate(`${location.pathname}?${newQueryParams.toString()}`);
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 mt-5">
            <p className="text-center mt-5">Loading...</p>
        </div>
    );

    if (error) return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 mt-5">
            <h1 className="text-center text-secondary">{error}</h1>
        </div>
    );

    if (movies.length === 0) return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 mt-5">
            {location.pathname === '/search' 
            ? <h1 className="text-center text-secondary">No results found for "{query}".</h1> 
            : <h1 className="text-center text-secondary">No results found.</h1>}
        </div>
    );

    return (
        <div className="row">
            <div className="row__posters">
                {movies.map((movie) => (
                    <div key={movie.id} className="row__posterContainer" onClick={() => handleClick(movie.id)}>
                        <img
                            className="row__poster"
                            src={`${base_url}${movie.poster_path}`}
                            alt={movie.title || movie.name}
                        />
                        <div className="row__movieInfo">
                            <p className="row__movieTitle">{movie.title}</p>
                            <p className="row__movieRating">Rating: {movie.vote_average.toFixed(1)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination d-flex flex-wrap justify-content-center align-items-center mt-3">
                <button className="btn btn-secondary m-1" onClick={handlePrevious} disabled={currentPage === 1}>
                    Previous
                </button>
                <span className="m-2">{`${currentPage} of ${totalPages}`}</span>
                <button className="btn btn-secondary m-1" onClick={handleNext} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Row;


