import { useState, useEffect } from "react";
import Card from "../Components/Card";
import axios from "axios";

const Man = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      role: "system",
      content: "Welcome to CinAi! You forgot a movie name? I will help you!",
    },
  ]);

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const TMDB_API_KEY = import.meta.env.VITE_TMDB;
  const GEMINI_AI_API_KEY = import.meta.env.VITE_GEMINI_AI;

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  const handleSearchClick = async () => {
    if (searchTerm.trim() === "") return;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        searchTerm
      )}`
    );
    const data = await response.json();
    setMovies(data.results);
    setSearchTerm("");
  };

  const handleGenreChange = async (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);

    const url =
      genre === "all"
        ? `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        : `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genre}`;

    const response = await fetch(url);
    const data = await response.json();
    setMovies(data.results);
  };

  const handleSend = async () => {
    if (!chatInput.trim()) return;

    const newMessages = [...chatMessages, { role: "user", content: chatInput }];
    setChatMessages(newMessages);

try {
  const response = await axios.post(
    `https://api.gemini.ai/v1/chat/completions`,  // Correct endpoint for Gemini 1.5 Flash
    {
      input: chatInput, // The user input, like "a movie where a man turns into an ant"
      context: `You are CinAi, a movie assistant AI. The user will give you a movie description or vague details. Try to guess the most likely movie name they are referring to.`,
    },
    {
      headers: {
        Authorization: `Bearer ${GEMINI_AI_API_KEY}`,  // Your API Key for authentication
        'Content-Type': 'application/json', // Ensure the request content type is JSON
      },
    }
  );

  console.log("Response data:", response.data);

  // Extract the response message (completion) from the Gemini API response
  const completion = response.data.completion || "No response from the AI";  // Handle empty or error responses

  // Update the chat messages with the AI's response
  setChatMessages([
    ...newMessages,
    { role: "ai", content: completion },
  ]);
} catch (error) {
  console.error("Error:", error.response ? error.response.data : error.message);

  // If an error occurs, notify the user gracefully
  setChatMessages([
    ...newMessages,
    { role: "ai", content: "Oops! Something went wrong with CinAi." },
  ]);
}

setChatInput("");  // Clear the chat input for the next message
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setChatMessages([
      {
        role: "system",
        content: "Welcome to CinAi! You forgot a movie name? I will help you!",
      },
    ]);
    setChatInput("");
  };

  return (
    <div className="bg-cover bg-gray-900 min-h-screen text-white">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
          <div className="bg-gray-900 text-white rounded-lg w-full max-w-2xl h-[90vh] flex flex-col shadow-lg">
            <div className="flex justify-between items-center border-b border-gray-700 p-4">
              <h2 className="text-lg font-semibold">CinAi</h2>
              <button
                className="text-white text-xl hover:text-red-500"
                onClick={handleModalClose}
              >
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    msg.role === "user"
                      ? "bg-gray-800 text-right"
                      : "bg-gray-700 text-left"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 p-4 flex gap-2">
              <input
                type="text"
                className="flex-1 bg-gray-800 text-white p-2 rounded"
                placeholder="Describe the movie to CinAi..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-transparent backdrop-blur-md bg-gray-900">
        <nav className="flex flex-wrap items-center justify-between gap-4 p-4">
          <div className="text-2xl font-bold text-white">
            Cin<span className="text-orange-400">View</span>
          </div>

          <div className="flex justify-center items-center space-x-2 flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Search Here"
              className="bg-transparent text-white border border-white rounded p-2 w-full max-w-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-transparent border border-white text-white p-2 rounded"
              onClick={handleSearchClick}
            >
              🔍
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  className="text-white hover:text-orange-400"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }}
                >
                  CinAi
                </a>
              </li>
            </ul>
            <select
              id="genre"
              className="bg-transparent text-gray-400 border border-white rounded p-2"
              value={selectedGenre}
              onChange={handleGenreChange}
            >
              <option value="" disabled>
                Select Genre
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
              <option value="9648">Mystery</option>
              <option value="10749">Romance</option>
              <option value="878">Science Fiction</option>
              <option value="53">Thriller</option>
              <option value="10752">War</option>
              <option value="37">Western</option>
            </select>
          </div>
        </nav>
      </div>

      <div className="flex justify-center mt-12 mb-12">
        <h1 className="text-4xl font-bold text-white">
          Trending <span className="text-orange-400">Movies</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 pb-12">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            overview={movie.overview}
            releaseDate={movie.release_date}
            rating={movie.vote_average}
            genres={movie.genre_ids}
            cast={movie.cast}
            trailerUrl={movie.trailerUrl}
            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            movieId={movie.id}
          />
        ))}
      </div>
    </div>
  );
};
export default Man;


