// Carousel.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Carousel = ({ listings }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalListings = listings.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalListings);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalListings) % totalListings);
  };

  return (
    <div className="relative w-full">
      {totalListings > 0 ? (
        <>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {listings.map((listing, index) => (
                <div key={index} className="min-w-full">
                  <Link to={`/listing/${listing._id}`}>
                    <img src={listing.imageUrl[0]} alt={listing.name} className="w-full h-60 object-cover" />
                    <h3 className="text-lg font-semibold">{listing.name}</h3>
                    <p>{listing.description}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2">
            Prev
          </button>
          <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2">
            Next
          </button>
        </>
      ) : (
        <p>No listings available.</p>
      )}
    </div>
  );
};

export default Carousel;
