import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Banner from '../Banner/Banner';
import CastRow from '../CastRow/CastRow';
import requests from '../../api/requests';

function MovieDetails() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchMovieDetails = async (retry = 2) => {
            setLoading(true);
            try {
                const movieRequest = await axiosInstance.get(requests.fetchMovieDetails(movieId));
                setMovie(movieRequest.data);

                const castRequest = await axiosInstance.get(requests.fetchMovieCast(movieId));
                setCast(castRequest.data.cast.slice(0, 10));
                setError(null); 
            } catch (err) {
                if (err.message === "Network Error" || err.code === 'ERR_NETWORK') {
                    setError("No internet connection. Please check your network and try again.");
                } else if (retry > 0) {
                    fetchMovieDetails(retry - 1); 
                } else {
                    setError("An error occurred. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetails();
    }, [movieId]);

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

    if (!movie || cast.length === 0) return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 mt-5">
            <h1 className="text-center text-secondary">No details available.</h1>
        </div>
    );

    return (
        <div>
            <Banner movie={movie} />
            <CastRow cast={cast} />
        </div>
    );
}

export default MovieDetails;

