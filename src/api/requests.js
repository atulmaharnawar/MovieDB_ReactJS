const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

const requests = {
    fetchPopular: `/movie/popular?api_key=${API_KEY}&language=en-US`,
    fetchUpcoming:`/movie/upcoming?api_key=${API_KEY}&language=en-US`,
    fetchTopRated:`/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchSearch: (query) => `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`,
    fetchMovieDetails: (movieId) => `/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
    fetchMovieCast: (movieId) => `/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
};

export default requests;




