import React, { useEffect, useState } from "react"; // Import React and hooks
import axios from "axios"; // Import axios for making HTTP requests
import { useParams, useNavigate } from "react-router-dom"; // Import hooks for routing

// Constants for API key and URL
const API_KEY = "8f1d9dfc40f23ef2e578f84d6e9fba47";
const API_URL = "https://api.themoviedb.org/3/movie/";

function MovieDetail() {
  // Get the 'id' parameter from the URL
  const { id } = useParams();
  // useState hook to manage the movie data
  const [movie, setMovie] = useState(null);
  // useNavigate hook for navigation
  const navigate = useNavigate();

  // useEffect hook to fetch movie details when the component mounts or 'id' changes
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // Make a GET request to the API to fetch movie details
        const response = await axios.get(`${API_URL}${id}`, {
          params: {
            api_key: API_KEY,
          },
        });
        // Set the fetched movie data to the state
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [id]); // Dependency array with 'id' ensures the effect runs when 'id' changes

  // If the movie data is not yet loaded, show a loading message
  if (!movie) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="movie-detail">
        {/* Display the movie title */}
        <h1>{movie.title}</h1>
        {/* Display the movie overview */}
        <p>{movie.overview}</p>
        {/* Display the movie poster image */}
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        {/* Back button to navigate to the previous page */}
        <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>
      </div>
    </div>
  );
}

export default MovieDetail;
