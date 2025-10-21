import { useEffect, useState } from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';

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
    }, 10000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <header className="w-full bg-[#0D1B2A] py-3 text-white text-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center h-full">
          {/* Promo Message - Centered across full viewport */}
          <div
            className="
              font-medium pointer-events-none
              text-left md:text-center
              w-full md:w-auto
              md:absolute md:left-1/2 md:-translate-x-1/2
            "
          >
            <p className="transition-opacity duration-500 ease-in-out whitespace-nowrap">
              {messages[index]}
            </p>
          </div>

          {/* Right Side Icons - Aligned with main header icons */}
          <div className="ml-auto flex items-center space-x-6 relative z-10 pointer-events-auto">
            <a target="_blank" rel="noopener noreferrer"
              href="https://www.youtube.com/@AlexSmaginDev"
              aria-label="YouTube"
              className="transform transition-transform duration-200 hover:scale-110 hover:text-gray-300"
            >
              <FaYoutube size={18} />
            </a>
            <a target="_blank" rel="noopener noreferrer"
              href="https://www.linkedin.com/company/104436074"
              aria-label="LinkedIn"
              className="transform transition-transform duration-200 hover:scale-110 hover:text-gray-300"
            >
              <FaLinkedin
                size={18}
                className="fill-current text-white hover:text-gray-300"
                stroke="none"
              />
            </a>
            <a target="_blank" rel="noopener noreferrer"
              href="https://x.com/alexsmagin29"
              aria-label="Twitter"
              className="transform transition-transform duration-200 hover:scale-110 hover:text-gray-300"
            >
              <FaXTwitter
                size={18}
                className="fill-current text-white hover:text-gray-300"
                stroke="none"
              />
            </a>
            <a target="_blank" rel="noopener noreferrer"
              href="https://www.facebook.com/profile.php?id=61580367112591"
              aria-label="Facebook"
              className="transform transition-transform duration-200 hover:scale-110 hover:text-gray-300"
            >
              <FaFacebook
                size={18}
                className="fill-current text-white hover:text-gray-300"
                stroke="none"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
