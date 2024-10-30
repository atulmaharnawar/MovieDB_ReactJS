import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Row from "./components/Row/Row"
import MovieDetails from "./components/MovieDetails/MovieDetails";
import requests from './api/requests';
import SearchResults from './components/SearchResults';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Row fetchUrl={requests.fetchPopular} />} />
        <Route exact path="/top-rated" element={<Row fetchUrl={requests.fetchTopRated} />} />
        <Route exact path="/upcoming" element={<Row fetchUrl={requests.fetchUpcoming} />} />
        <Route exact path="/movie/:movieId" element={<MovieDetails />} />
        <Route exact path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;









