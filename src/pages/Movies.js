import React, { useState } from "react";
import Layout from "../components/Layout";

const API_KEY = "8f5d4814"; 

const Movies = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState("");

  // Search movies by title
  const searchMovies = async () => {
    if (!query.trim()) {
      setError("Please enter a movie name.");
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "False") {
        setError("No movies found.");
        setResults([]);
      } else {
        setError("");
        setResults(data.Search);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error(err);
    }
  };

  // Get details for a selected movie
  const getMovieDetails = async (id) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
      );

      const data = await response.json();
      setSelectedMovie(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
    <div className="container mt-4">
      <h2 className="text-center mb-4">Movie Search</h2>

      {/* Search Bar */}
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search movie by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={searchMovies}>
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-danger">{error}</p>}

      {/* Movie Results */}
      <div className="row">
        {results.map((movie) => (
          <div className="col-md-3 mb-4" key={movie.imdbID}>
            <div
              className="card h-100 shadow-sm"
              onClick={() => getMovieDetails(movie.imdbID)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : ""}
                className="card-img-top"
                alt={movie.Title}
                style={{ height: "350px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">Year: {movie.Year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">{selectedMovie.Title}</h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedMovie(null)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={selectedMovie.Poster}
                      alt={selectedMovie.Title}
                      className="img-fluid rounded"
                    />
                  </div>

                  <div className="col-md-8">
                    <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
                    <p><strong>Director:</strong> {selectedMovie.Director}</p>
                    <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
                    <p><strong>Released:</strong> {selectedMovie.Released}</p>
                    <p><strong>IMDB Rating:</strong> {selectedMovie.imdbRating}</p>
                    <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedMovie(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          
        </div>
      )}
    </div>
    </Layout>
  );
};

export default Movies;
