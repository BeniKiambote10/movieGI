import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
    );
    const data = await response.json();
    setResults(data.results);
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for movies..."
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      <ul className="movie-list">
        {results.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
