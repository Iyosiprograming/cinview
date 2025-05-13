import React, { useEffect, useState } from "react";
import Card from "../Components/Card";

const Man = () => {
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState("");

  const handleSearch = () => {
    if (searchMovies.trim() !== "") {
      const fetchMovies = async () => {
        const TMDB_API_KEY = import.meta.env.VITE_TMDB;
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchMovies}`
          );
          const data = await response.json();
          setMovies(data.results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };
      fetchMovies();
    }
  };

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const TMDB_API_KEY = import.meta.env.VITE_TMDB;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchTrendingMovies();
  }, []);

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    const fetchMoviesByGenre = async () => {
      const TMDB_API_KEY = import.meta.env.VITE_TMDB;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${selectedGenre}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies by genre:", error);
      }
    };
    fetchMoviesByGenre();
  };

  return (
    <div className="bg-gray-900 h-screen h-full">
      <nav className="flex justify-between items-center px-6 py-4 bg-black/40">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Cin<span className="text-orange-400">View</span>
          </h1>
        </div>
        <ul className="flex space-x-6 text-white">
          <li>
            <a href="/" className="hover:underline">
              CinAi
            </a>
          </li>
          <li>
            <select
              className="bg-gray-800 text-white border border-gray-600 rounded"
              onChange={handleGenreChange}
            >
              <option value="" disabled>
                Select a Genre
              </option>
              <option value="28">Action</option>
              <option value="12">Adventure</option>
              <option value="16">Animation</option>
              <option value="35">Comedy</option>
              <option value="80">Crime</option>
              <option value="99">Documentary</option>
              <option value="18">Drama</option>
              <option value="10751">Family</option>
              <option value="14">Fantasy</option>
              <option value="36">History</option>
              <option value="27">Horror</option>
              <option value="10402">Music</option>
              <option value="9648">Mystery</option>
              <option value="10749">Romance</option>
              <option value="878">Science Fiction</option>
              <option value="10770">TV Movie</option>
              <option value="53">Thriller</option>
              <option value="10752">War</option>
              <option value="37">Western</option>
            </select>
          </li>
        </ul>
      </nav>

      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-4xl font-bold text-white">
          Discover Your Favorite <span className="text-orange-400">Movies</span>{" "}
          And <span className="text-orange-400">TV Shows</span>
        </h1>
      </div>

      <div className="flex items-center justify-center mt-10 space-x-4">
        <input
          type="text"
          placeholder="Search for a movie or tv show"
          className="border border-gray-600 rounded p-4 w-1/3 bg-gray-800 text-white"
          value={searchMovies}
          onChange={(e) => setSearchMovies(e.target.value)}
        />
        <button
          className="bg-gray-800 text-white border border-gray-600 rounded p-2"
          onClick={handleSearch} // Call handleSearch when button is clicked
        >
          🔍
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-4">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            movie={movie}
            className="bg-gray-800 rounded-lg shadow-lg p-4 m-4"
          />
        ))}
      </div>
    </div>
  );
};

export default Man;
