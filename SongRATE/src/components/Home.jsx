import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/SongRATE_White.png";
import { Link } from "react-router-dom";

export default function Home() { // Saya ubah nama fungsi jadi Home agar sesuai nama file
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // 1. Cek User Login saat komponen dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
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

  // 3. Helper untuk Inisial Nama
  const getUserInitial = () => {
    if (user && user.username) {
      return user.username.charAt(0).toUpperCase();
    }
    return "?";
  };

  const navItems = [
    { to: "/top-artist", label: "Top Artist" },
    { to: "/rating", label: "Ratings" },
    { to: "/chart", label: "Chart" },
    { to: "/new-releases", label: "New Releases" },
    { to: "/news", label: "News" },
  ];

  return (
    <header className="w-full text-white fixed top-0 left-0 z-50">
      {/* Navbar Pertama (Logo & Profile) */}
      <div className="bg-[#1E2129] shadow-md">
        {/* Tambahkan flex dan justify-between agar Logo di kiri, Profile di kanan */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          
          {/* LOGO */}
          <button
            onClick={() => navigate("/Home")}
            className="focus:outline-none hover:opacity-80 transition"
          >
            <img src={Logo} alt="SongRATE Logo" className="h-12 sm:h-14 w-auto" />
          </button>

          {/* PROFILE SECTION (Hanya muncul jika user login) */}
          {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-[#2A2E37] px-4 py-2 rounded-full border border-gray-600">
                <span className="font-semibold text-yellow-400 capitalize hidden sm:block max-w-[150px] truncate">
                  {user.username}
                </span>
                
                {/* Avatar Hijau dengan Inisial */}
                <div className="h-8 w-8 rounded-full bg-green-600 border-2 border-yellow-400 flex items-center justify-center text-white font-bold shadow-sm">
                  {getUserInitial()}
                </div>
              </div>

              {/* Tombol Logout Desktop */}
              <button
                onClick={handleLogout}
                className="hidden sm:block text-gray-400 hover:text-white transition font-medium text-sm"
              >
                Log Out
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Navbar Kedua - Menu Navigasi */}
      <div className="bg-[#3E424B] shadow-lg">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Menu */}
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

          {/* Mobile Menu Toggle (Hamburger) */}
          <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#2A2D35]">
            <span className="text-gray-400 text-sm font-medium">Menu</span>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none p-2 rounded-lg hover:bg-[#3E424B] transition"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute left-0 top-1 w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-3' : ''}`}></span>
                <span className={`absolute left-0 top-3 w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`absolute left-0 top-5 w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-3' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Dropdown */}
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
              
              {/* Logout Button di Mobile Menu */}
              {user && (
                 <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="w-full text-left block text-red-400 hover:text-red-300 duration-200 font-medium text-base py-3 px-4 rounded-lg hover:bg-[#3E424B] transition"
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}