import React, { useState } from 'react';

const Card = ({ title, imageUrl, overview, adult, releaseDate, rating, trailerUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ageRating = adult ? "13+" : "18+";


  return (
    <>
      <div
        className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
        onClick={openModal}
      >
        <img src={imageUrl} alt={title} className="w-full h-auto object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center p-2">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative w-full h-full backdrop-blur-sm">
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={closeModal}
            >
              &times;
            </button>

            <div className="flex justify-center items-center w-full h-full px-8 py-4">
              <div className="w-1/3">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-auto object-contain border-4 border-white rounded-lg"
                />
              </div>

              <div className="text-white w-2/3 text-center bg-opacity-70 rounded-lg p-8">
                <h2 className="text-5xl font-bold mb-4">{title}</h2>
                <p className="text-xl mb-4">{overview}</p>
                <p className="text-lg mb-2">Adult: {ageRating}</p>
                <p className="text-lg mb-2">Genre: Action</p>
                <p className="text-lg mb-2">Release Date: {releaseDate}</p>
                <p className="text-lg mb-4">Rating: {rating}</p>
                <button
                  className="bg-red-400 text-white py-2 px-6 rounded-lg hover:bg-red-500 transition duration-300"
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${trailerUrl}`, '_blank')}
                >
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;


