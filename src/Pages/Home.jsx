import React, { useState, useEffect } from "react";
const Home = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB;

  useEffect(() => {
  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`
      );
      const data = await response.json();

      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMovie = data.results[randomIndex];

      setBackgroundImageUrl(
        `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
      );
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  fetchMovies();
}, []);


  return (
    <div
      className={`bg-cover bg-center h-screen`}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <nav className="flex justify-between items-center px-6 py-4 bg-black/40 ">
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
            <a href="/movies" className="hover:underline">
              Movies
            </a>
          </li>
          <li>
            <a href="/tv" className="hover:underline">
              TV Shows
            </a>
          </li>
        </ul>
      </nav>

      <div>
        <h1 className="text-5xl font-bold text-white text-opacity-80 text-center mt-32">
          Discover Your Next Favorite{" "}
          <span className="text-orange-400 ">Movie</span> And
          <span className="text-orange-400"> Tv Show</span>
        </h1>
      </div>

      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <button className="text-white bg-transparent border-2 border-white rounded-lg px-12 py-4 hover:bg-white hover:text-black transition duration-300 backdrop-blur-lg bg-opacity-30">
          Explore
        </button>
      </div>
    </div>
  );
};

export default Home;
