import { useState } from "react";

const Card = ({ movie }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true); 
  };

  const handleClose = (e) => {
    e.stopPropagation(); 
    setIsClicked(false); 
  };

  return (
    <>
      <div
        className="bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-sm m-auto cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={handleClick}
      >
        <div className="w-full bg-black">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="p-1">
          <h2 className="text-lg text-white mb-1 text-center">{movie.title}</h2>
        </div>
      </div>

      {isClicked && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="absolute inset-0 bg-gray-700 bg-opacity-90 backdrop-blur-sm"></div>

          <div className="relative  rounded-lg p-6 max-w-4xl w-full flex flex-col md:flex-row gap-6 text-white">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white text-3xl hover:text-red-500"
            >
              &times;
            </button>

            <div className="w-full md:w-1/3">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg w-full h-auto object-contain"
              />
            </div>

            <div className="w-full md:w-2/3 space-y-4">
              <h1 className="text-4xl font-bold">{movie.title}</h1>
              <p className="text-white">{movie.overview || "No description available."}</p>
              <div className="text-sm text-white">
                <p><strong>Release Date:</strong> {movie.release_date}</p>
                <p><strong>Rating:</strong> {movie.vote_average}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
