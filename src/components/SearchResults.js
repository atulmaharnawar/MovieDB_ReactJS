import React from 'react';
import { useLocation } from "react-router-dom";
import Row from './Row/Row'
import requests from '../api/requests';

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query')?.trim();

    return query ? <Row fetchUrl={requests.fetchSearch(query)} query={query} /> : <p>Please enter a search term.</p>;
};

export default SearchResults;




