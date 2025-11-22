import { useNavigate } from "react-router-dom";
import Logo from "../assets/SongRATE_White.png";

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
    </header>
  );
}
