import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/SongRATE_White.png";
import { useState, useEffect } from "react";

// Placeholder gambar profil (bisa diganti dengan foto user asli nanti)
import DefaultAvatar from "../assets/react.svg"; // Pastikan path ini ada atau gunakan link eksternal

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 1. Cek status login saat komponen dimuat
  useEffect(() => {
    // Ambil data user yang disimpan di localStorage saat login
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 2. Fungsi Logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <header className="bg-[#1E2129] w-full text-white sticky top-0 z-50 shadow-md">
      {/* NAVBAR UTAMA */}
      <nav className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 md:gap-3">
          <img 
            src={Logo} 
            alt="SongRATE Logo" 
            className="h-8 sm:h-10 md:h-12 w-auto" 
          />
        </Link>

        {/* Desktop Navigation / Profile Section */}
        <div className="hidden md:flex gap-4 items-center">
          
          {/* LOGIKA: Jika User Login -> Tampilkan Profil. Jika Belum -> Tampilkan Tombol */}
          {user ? (
            <div className="flex items-center gap-4">
              {/* Profil Info */}
              <div className="flex items-center gap-3 bg-[#2A2E37] px-4 py-2 rounded-full border border-gray-600">
                <span className="font-semibold text-yellow-400 capitalize">
                  {user.username}
                </span>
                <div className="h-8 w-8 rounded-full bg-gray-500 overflow-hidden border-2 border-yellow-400">
                  {/* Gunakan gambar default atau inisial nama */}
                  <img 
                    src={DefaultAvatar} 
                    alt="User" 
                    className="h-full w-full object-cover"
                    onError={(e) => {e.target.onerror = null; e.target.src="https://via.placeholder.com/150"}}
                  />
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white transition font-medium text-sm"
              >
                Log Out
              </button>
            </div>
          ) : (
            // Tampilan Belum Login
            <>
              <Link
                to="/signup"
                className="px-6 sm:px-8 md:px-10 py-2 font-bold bg-yellow-400 text-black rounded-xl hover:bg-yellow-500 transition-colors duration-300 text-sm sm:text-base"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="px-6 sm:px-8 md:px-10 py-2 font-bold bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors duration-300 text-sm sm:text-base"
              >
                Log In
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-yellow-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1E2129] border-t border-gray-700 px-4 py-6 shadow-lg animate-slideDown">
          <div className="flex flex-col gap-4">
            
            {user ? (
              // Mobile View: Logged In
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
                  <div className="h-10 w-10 rounded-full bg-gray-500 overflow-hidden border-2 border-yellow-400">
                    <img src={DefaultAvatar} alt="User" className="h-full w-full object-cover"/>
                  </div>
                  <span className="font-bold text-lg text-white capitalize">{user.username}</span>
                </div>
                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="w-full py-3 font-bold bg-red-500 text-white rounded-xl hover:bg-red-600 transition text-center"
                >
                  Log Out
                </button>
              </>
            ) : (
              // Mobile View: Not Logged In
              <>
                <Link
                  to="/signup"
                  className="w-full py-3 font-bold bg-yellow-400 text-black rounded-xl hover:bg-yellow-500 transition text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="w-full py-3 font-bold bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
              </>
            )}

          </div>
        </div>
      )}
    </header>
  );
}