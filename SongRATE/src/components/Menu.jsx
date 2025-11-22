import { useNavigate } from "react-router-dom";
import Logo from "../assets/SongRATE_White.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="bg-[#1E2129] w-full text-white fixed top-0 left-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
        {/* LOGO */}
        <button
          onClick={() => navigate("/")}
          className="focus:outline-none hover:opacity-80 transition"
        >
          <img src={Logo} alt="SongRATE Logo" className="h-12 w-auto" />
        </button>
      </nav>

      {/* NAVBAR KEDUA (MENU) */}
      <div className="w-full px-10 py-3 flex justify-center font-bold gap-10 text-lg bg-[#3E424B]">
        <Link to="/home" className="hover:text-yellow-300 duration-200">
          Home
        </Link>

        <Link to="/top-songs" className="hover:text-yellow-300 duration-200">
          Top Songs
        </Link>

        <Link to="/chart" className="hover:text-yellow-300 duration-200">
          Chart
        </Link>

        <Link to="/new-releases" className="hover:text-yellow-300 duration-200">
          New Releases
        </Link>

        <Link to="/news" className="hover:text-yellow-300 duration-200">
          News
        </Link>
      </div>
    </header>
  );
}
