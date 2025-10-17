import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';

const customerCare = [
  { name: 'My Account', href: '/login' },
  { name: 'My Orders', href: '/login' },
  { name: 'Email Support', href: 'mailto:info@opencodechicago.org' },
  { name: 'Call Support', href: 'tel:+13125551234' },
];

const information = [
  { name: 'Shipping Policy', href: '/shipping-policy' },
  { name: 'Return Policy', href: '/return-policy' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Accessibility', href: '/accessibility' },
  { name: 'Terms of Service', href: '/terms-of-service' },
];

export default function TopFooter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!isValidEmail) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 2000));

      console.log('Subscribed:', email);
      toast.success(
        'Thank you for subscribing! Your email has been received. You’ll now get our latest deals and discounts.'
      );

      setStatus('success');
      setEmail('');

      // Reset back to normal button after 2 seconds
      setTimeout(() => setStatus('idle'), 2000);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <footer className="bg-neutral-900 text-neutral-200 px-6 py-12">
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-3">
        {/* Logo + Address */}
        <div>
          <Link
            to="/"
            className="inline-block mb-4"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/icons/official-logo-core-x-footer.svg"
              alt="CoreX"
              className="mb-4 w-32"
            />
          </Link>
          <ul className="flex items-center space-x-6 mb-4">
            <li className="transform transition-transform duration-200 hover:scale-110">
              <a
                href="https://www.youtube.com/@AlexSmaginDev"
                aria-label="YouTube"
                className="hover:text-gray-300 transition-colors"
              >
                <FaYoutube size={18} />
              </a>
            </li>
            <li className="transform transition-transform duration-200 hover:scale-110">
              <a
                href="https://www.linkedin.com/company/104436074"
                aria-label="LinkedIn"
                className="hover:text-gray-300 transition-colors"
              >
                <FaLinkedin
                  size={18}
                  className="fill-current text-white hover:text-gray-300"
                  stroke="none"
                />
              </a>
            </li>
            <li className="transform transition-transform duration-200 hover:scale-110">
              <a
                href="https://x.com/alexsmagin29"
                aria-label="Twitter"
                className="hover:text-gray-300 transition-colors"
              >
                <FaXTwitter
                  size={18}
                  className="fill-current text-white hover:text-gray-300"
                  stroke="none"
                />
              </a>
            </li>
            <li className="transform transition-transform duration-200 hover:scale-110">
              <a
                href="https://www.facebook.com/profile.php?id=61580367112591"
                aria-label="Facebook"
                className="hover:text-gray-300 transition-colors"
              >
                <FaFacebook
                  size={18}
                  className="fill-current text-white hover:text-gray-300"
                  stroke="none"
                />
              </a>
            </li>
          </ul>
          <address className="hover:underline cursor-pointer not-italic text-sm leading-relaxed">
            1234 N Main St,
            <br /> Chicago, IL 60607
          </address>
        </div>

        {/* Navigation Links */}
        <nav className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h3 className="font-semibold text-white mb-3">Customer Care</h3>
            <ul className="space-y-2">
              {customerCare.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-300 link-underline transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Information</h3>
            <ul className="space-y-2">
              {information.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-300 link-underline transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <h3 className="text-4xl uppercase font-bold mb-4">
            Get our latest deals and discounts!
          </h3>
          <div className="flex bg-neutral-800 rounded-lg overflow-hidden hover:bg-neutral-700 transition relative">
            <div className="relative flex-grow">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="w-full p-3 bg-transparent text-neutral-200 outline-none transition duration-200 ease-in-out peer pt-4"
                required
              />
              <label className="absolute left-3 top-1 text-neutral-400 transition-all duration-200 ease-in-out pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-neutral-400 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-neutral-400">
                Enter your email
              </label>
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`p-2 m-2 rounded-full bg-white text-neutral-900 transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center
                ${status !== 'idle' ? 'w-10 h-10 p-0' : ''}
              `}
              aria-label="Subscribe"
            >
              {status === 'loading' ? (
                <svg
                  className="animate-spin h-5 w-5 text-neutral-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : status === 'success' ? (
                <svg
                  className="h-5 w-5 text-neutral-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <ArrowRight className="w-5 h-5 text-neutral-900" />
              )}
            </button>
          </div>
          <p className="mt-2 text-xs">
            Become a Core<span className="text-red-500">X</span> Insider!
          </p>
        </form>
      </div>
    </footer>
  );
}
