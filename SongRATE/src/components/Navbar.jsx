import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/SongRATE_White.png";
import { useState, useEffect } from "react";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
      setIsMenuOpen(false); // Tutup menu mobile saat logout
    }
  };

  // Helper untuk mendapatkan inisial huruf depan
  const getUserInitial = () => {
    if (user && user.username) {
      return user.username.charAt(0).toUpperCase();
    }
    return "?"; // Fallback jika terjadi error
  };

  const showProfile = user && location.pathname !== "/";

  return (
    <header className="bg-[#1E2129] w-full text-white sticky top-0 z-50 shadow-md">
      <nav className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to={user ? "/home" : "/"} className="flex items-center gap-2 md:gap-3">
          <img 
            src={Logo} 
            alt="SongRATE Logo" 
            className="h-8 sm:h-10 md:h-12 w-auto" 
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 items-center">
          
          {showProfile ? (
            // --- TAMPILAN DESKTOP: SUDAH LOGIN ---
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-[#2A2E37] px-4 py-2 rounded-full border border-gray-600">
                <span className="font-semibold text-yellow-400 capitalize max-w-[150px] truncate">
                  {user.username}
                </span>
                
                {/* --- AVATAR BARU (Latar Hijau + Huruf) --- */}
                <div className="h-8 w-8 rounded-full bg-green-600 border-2 border-yellow-400 flex items-center justify-center text-white font-bold shadow-sm">
                  {getUserInitial()}
                </div>
                 {/* --------------------------------------- */}

              </div>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white transition font-medium text-sm"
              >
                Log Out
              </button>
            </div>
          ) : (
            // --- TAMPILAN DESKTOP: BELUM LOGIN / LANDING PAGE ---
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
        >
          {isMenuOpen ? (
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1E2129] border-t border-gray-700 px-4 py-6 shadow-lg animate-slideDown">
          <div className="flex flex-col gap-4">
            {showProfile ? (
              // --- TAMPILAN MOBILE: SUDAH LOGIN ---
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
                  
                  {/* --- AVATAR BARU MOBILE (Ukuran sedikit lebih besar: h-10 w-10) --- */}
                  <div className="h-10 w-10 rounded-full bg-green-600 border-2 border-yellow-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    {getUserInitial()}
                  </div>
                  {/* --------------------------------------- */}

                  <span className="font-bold text-lg text-white capitalize truncate">{user.username}</span>
                </div>
                <button onClick={handleLogout} className="w-full py-3 font-bold bg-red-500 text-white rounded-xl hover:bg-red-600 transition text-center">Log Out</button>
              </>
            ) : (
              // --- TAMPILAN MOBILE: BELUM LOGIN ---
              <>
                <Link to="/signup" className="w-full py-3 font-bold bg-yellow-400 text-black rounded-xl hover:bg-yellow-500 transition text-center" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                <Link to="/login" className="w-full py-3 font-bold bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition text-center" onClick={() => setIsMenuOpen(false)}>Log In</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}