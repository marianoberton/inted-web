"use client";
import { useState } from 'react';

const images = [
  '/path/to/image1.jpg',
  '/path/to/image2.jpg',
  '/path/to/image3.jpg',
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden mt-8">
      <div className="absolute inset-0 flex justify-between items-center">
        <button onClick={prevSlide} className="p-4 bg-gray-800 text-white">Prev</button>
        <button onClick={nextSlide} className="p-4 bg-gray-800 text-white">Next</button>
      </div>
      <img src={images[currentIndex]} alt="Carousel Image" className="w-full h-full object-cover" />
    </div>
  );
}
