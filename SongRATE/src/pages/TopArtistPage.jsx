import Menu from "../components/Menu";
import topArtists from "../data/topArtists";
import { Link } from "react-router-dom";

export default function TopArtistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-bl pt-[140px] from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white">
      <Menu />

      <h2 className="text-5xl text-center font-bold">Top Artist</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-12 gap-x-6 px-8 mt-16 mb-20">
        {topArtists.map((artist) => (
          <Link
            to={`/artist/${artist.id}`}
            key={artist.id}
            className="flex flex-col items-center text-center cursor-pointer"
          >
            <img
              src={artist.image}
              alt={artist.name}
              className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full border-2 border-gray-600 shadow-lg"
            />
            <p className="mt-4 text-lg font-semibold">{artist.name}</p>
          </Link>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="bg-[#3E424B85] text-gray-300 py-10 px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* CONTACT */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <ul className="space-y-2">
              <li>Text Message</li>
              <li>Instagram</li>
              <li>TikTok</li>
            </ul>
          </div>

          {/* SUBSCRIBE */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Subscribe to Us</h2>
            <p className="text-sm mb-4">
              We'll send you the latest releases, news, and offers.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-l-lg bg-[#3E424B] text-gray-200 focus:outline-none"
              />
              <button className="bg-yellow-500 px-4 rounded-r-lg">
                <svg width="20" height="20" fill="black" viewBox="0 0 24 24">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-10">
          © 2025 SongRate
        </div>
      </footer>
    </div>
  );
}
