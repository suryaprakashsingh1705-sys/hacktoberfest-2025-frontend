import React, { useEffect, useState } from 'react';
import { FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function TopHeader() {
  const messages = [
    <>
      Buy 1 get 1{' '}
      <span className="underline decoration-red-500 decoration-2 underline-offset-4 text-white">
        50% off
      </span>
    </>,
    <>
      <span className="underline decoration-red-500 decoration-2 underline-offset-4 text-white">
        Free shipping
      </span>{' '}
      on orders over $110
    </>,
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 10000); // rotates every 10 seconds
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <header className="w-full bg-[#0D1B2A] py-3 text-white text-sm fixed top-0 z-50 flex items-center justify-end px-4">
      {/* Promo Message - Left on mobile, centered on desktop */}
      <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 font-medium text-left md:text-center">
        <p className="transition-opacity duration-500 ease-in-out">
          {messages[index]}
        </p>
      </div>
      {/* Right Side Icons */}
      <div className="flex space-x-4">
        <a href="#" aria-label="YouTube" className="hover:text-gray-300">
          <FaYoutube size={18} />
        </a>
        <a href="#" aria-label="LinkedIn" className="hover:text-gray-300">
          <FaLinkedin
            size={18}
            className="fill-current text-white hover:text-gray-300"
            stroke="none"
          />
        </a>
        <a href="#" aria-label="Twitter" className="hover:text-gray-300">
          <FaXTwitter
            size={18}
            className="fill-current text-white hover:text-gray-300"
            stroke="none"
          />
        </a>
        <a href="#" aria-label="Facebook" className="hover:text-gray-300">
          <FaFacebook
            size={18}
            className="fill-current text-white hover:text-gray-300"
            stroke="none"
          />
        </a>
      </div>
    </header>
  );
}
