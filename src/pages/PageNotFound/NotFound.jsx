import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    // Dynamically add Google Font
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Rubik+Dirt&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  const isMobile = window.innerWidth < 768;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center md:flex justify-center items-center text-white text-center px-4"
      style={{
        backgroundImage: isMobile
          ? "url('/images/pnf-mob.png')" // mobile image
          : "url('/images/notFoundLandscape.png')", // desktop image
      }}
    >
      <div className="md:w-1/2 max-w-2xl px-12 pt-30 md:pt-0">
        {/* 404 text */}
        <h1 className="text-9xl md:text-9xl font-extrabold tracking-widest">
          404
        </h1>

        {/* Subtitle */}
        <h2
          className="text-4xl md:text-7xl mt-4 "
          style={{ fontFamily: "'Rubik Dirt', cursive" }}
        >
          NOT FOUND
        </h2>

        {/* Description */}
        <p className="uppercase mt-6  font-semibold">
          Oops! This page wandered off the workout plan.
        </p>

        <p className="mt-3 text-gray-400 leading-relaxed">
          Looks like the page you're looking for doesn't exist. But don't worry
          — your fitness journey doesn't stop here. Fuel your goals with CoreX
          supplements.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:bg-red-600 hover:text-white transition"
          >
            GO TO HOME PAGE
          </Link>

          <Link
            to="/products"
            className="border border-white px-6 py-3 rounded-2xl font-semibold hover:bg-red-600 hover:border-red-600 transition"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
      <div className="w-1/2 bg-blue-500"></div>
    </div>
  );
}
