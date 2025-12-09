import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/SongRATE_White.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: "/top-artist", label: "Top Artist" },
    { to: "/rating", label: "Ratings" },
    { to: "/chart", label: "Chart" },
    { to: "/new-releases", label: "New Releases" },
    { to: "/news", label: "News" },
  ];

  return (
    <header className="w-full text-white fixed top-0 left-0 z-50">
      {/* Navbar Pertama*/}
      <div className="bg-[#1E2129] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* LOGO saja */}
          <button
            onClick={() => navigate("/")}
            className="focus:outline-none hover:opacity-80 transition"
          >
            <img src={Logo} alt="SongRATE Logo" className="h-12 sm:h-14 w-auto" />
          </button>
        </div>
      </div>

      {/* Navbar Kedua - Menu Navigasi */}
      <div className="bg-[#3E424B] shadow-lg">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Menu - Baris kedua untuk desktop */}
          <div className="hidden md:flex w-full py-4">
            <div className="flex justify-center items-center w-full font-bold gap-8 lg:gap-12 text-base lg:text-lg">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="hover:text-yellow-300 duration-200 px-4 py-2 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu - Hamburger untuk mobile */}
          <div className="md:hidden flex items-center justify-between px-4 py-3">
            {/* Logo kecil untuk mobile */}
            <button
              onClick={() => navigate("/")}
              className="focus:outline-none hover:opacity-80 transition"
            >
              <img src={Logo} alt="SongRATE Logo" className="h-8 w-auto" />
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none p-2 rounded-lg hover:bg-[#2A2D35] transition"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute left-0 top-1 w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-3' : ''}`}></span>
                <span className={`absolute left-0 top-3 w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`absolute left-0 top-5 w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-3' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div className={`md:hidden bg-[#2A2D35] transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block hover:text-yellow-300 duration-200 font-medium text-base py-3 px-4 rounded-lg hover:bg-[#3E424B] transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}