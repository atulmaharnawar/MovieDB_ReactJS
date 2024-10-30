import React from 'react';
import './Banner.css';

const base_url = "https://image.tmdb.org/t/p/w500/";

function Banner({ movie }) {
    return (
        <div className="banner">
            <div className="container bg-black p-3 mt-3 rounded-3 shadow-lg">
                <div className="row bg-black">
                    <div className="col-md-8 d-flex flex-wrap align-items-start mb-3">
                        <div className="me-3 mb-3" style={{ flex: "0 0 auto", height: "10rem" }}>
                            <img
                                src={`${base_url}${movie.poster_path}`}
                                alt={movie.title || movie.name}
                                className="img-fluid rounded-3 shadow banner__left__poster"
                                style={{ height: "100%", width: "auto" }}
                            />
                        </div>
                        <div className="flex-grow-1 text-light">
                            <h4>{movie.title || movie.name}</h4>
                            <p className="mb-1 text-info">Rating: {movie.vote_average.toFixed(1)}</p>
                            <p className="mb-1 border rounded px-2 d-inline-block" style={{ borderRadius: "0.25rem" }}>
                                {movie.runtime} min
                            </p>
                            <p className="mb-1 d-inline text-info" style={{ marginLeft: "0.5rem" }}>
                                {movie.genres && movie.genres.map(genre => genre.name).join(", ")}
                            </p>
                            <p className="mb-1">Release Date : {new Date(movie.release_date).toDateString()}</p>
                        </div>

                    </div>

                    <div className="col-md-4 d-flex align-items-center justify-content-end bg-black">
                        <img
                            src={`${base_url}${movie.backdrop_path}`}
                            alt={movie.title || movie.name}
                            className="img-fluid rounded-3 shadow banner__right__poster"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>
                </div>

                <div className="row mt-3 bg-black">
                    <h4>Overview</h4>
                    <div className="col text-light pt-1">
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Banner;


