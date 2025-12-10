import { Link } from "react-router-dom";
import Logo from "../assets/SongRATE_White.png";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#1E2129] w-full text-white sticky top-0 z-50">
      {/* NAVBAR UTAMA */}
      <nav className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3">
          <img 
            src={Logo} 
            alt="SongRATE Logo" 
            className="h-8 sm:h-10 md:h-12 w-auto" 
          />

        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4">
          <Link
            to="/signup"
            className="px-6 sm:px-8 md:px-10 py-2 font-bold bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-500 transition-colors duration-300 text-sm sm:text-base"
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="px-6 sm:px-8 md:px-10 py-2 font-bold bg-gray-500 rounded-xl hover:bg-gray-600 transition-colors duration-300 text-sm sm:text-base"
          >
            Log In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            // Close Icon (X)
            <svg 
              className="h-6 w-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          ) : (
            // Menu Icon (Hamburger)
            <svg 
              className="h-6 w-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1E2129] border-t border-gray-700 px-4 py-4 animate-slideDown">
          <div className="flex flex-col gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 font-bold bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-500 transition-colors duration-300 text-center text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>

            <Link
              to="/login"
              className="px-6 py-3 font-bold bg-gray-500 rounded-xl hover:bg-gray-600 transition-colors duration-300 text-center text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}