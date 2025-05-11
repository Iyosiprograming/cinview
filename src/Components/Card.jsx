import { useState } from "react";

const Card = ({ title, imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="card" onClick={openModal}>
        <img src={imageUrl} alt={title} className="card-image" />
        <div className="card-content">
          <h2 className="card-title">{title}title</h2>
        </div>
      </div>

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✖</button>
            <h2>{title}</h2>
            <img src={imageUrl} alt={title} className="modal-image" />
            <p>More detailed information about the movie goes here.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
