import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full px-10 py-6 flex justify-between items-center text-white">
      <h1 className="text-3xl font-bold tracking-wide">SONGRATE</h1>

      <div className="flex gap-10 text-lg">
        <button>Top Artist</button>
        <button>Top Songs</button>
        <button>Chart</button>
        <button>New Releases</button>
        <button>News</button>
      </div>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-5 py-2 bg-gray-500 rounded-xl hover:bg-gray-600"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-500"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
