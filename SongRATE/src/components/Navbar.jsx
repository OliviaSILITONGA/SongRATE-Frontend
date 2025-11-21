import { Link } from "react-router-dom";
import Logo from "../assets/SongRATE_White.png";

export default function Navbar() {
  return (
    <header className="bg-[#1E2129] w-full text-white">
      {/* // NAVBAR UTAMA */}
      <nav className="w-full px-10 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="SongRATE Logo" className="h-12 w-auto" />
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          <Link
            to="/signup"
            className="px-10 py-2 font-bold bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-500"
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="px-10 py-2 font-bold bg-gray-500 rounded-xl hover:bg-gray-600"
          >
            Log In
          </Link>
        </div>
      </nav>

      {/* // NAVBAR KEDUA (MENU) */}
      <div className="w-full px-10 py-3 flex justify-center font-bold gap-10 text-lg bg-[#3E424B]">
        <button>Top Artist</button>
        <button>Top Songs</button>
        <button>Chart</button>
        <button>New Releases</button>
        <button>News</button>
      </div>
    </header>
  );
}
