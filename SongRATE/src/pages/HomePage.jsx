import Home from "../components/Home";
import Banner from "../components/Banner";
import SongRatingCard from "../components/SongRatingCard";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white">
      <Home />
      <Banner />

      {/* Section Title */}
      <h2 className="text-3xl font-bold mt-10">Songs Rating This Week</h2>

      {/* Songs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-6">
        <SongRatingCard
          number="01"
          title="Let It Happen"
          artist="Tame Impala"
          albumCover="https://i.scdn.co/image/ab67616d0000b273c0481219777084d57c94bdfa"
        />
        <SongRatingCard
          number="02"
          title="Supermodel"
          artist="Måneskin"
          albumCover="https://i.scdn.co/image/ab67616d0000b27316f0a91860a1ac1e3f46a1ce"
        />
        <SongRatingCard
          number="03"
          title="Anti-Hero"
          artist="Taylor Swift"
          albumCover="https://i.scdn.co/image/ab67616d0000b273f4b79e927651c01fb9b31f57"
        />
        <SongRatingCard
          number="04"
          title="As It Was"
          artist="Harry Styles"
          albumCover="https://i.scdn.co/image/ab67616d0000b2735a4da1f2f7eacfa5f9c9f6b1"
        />
      </div>

      {/* FOOTER */}
      <footer className="bg-[#3E424B85] text-gray-300 py-10 px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* CONTACT */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <ul className="space-y-2">
              <li>Email: songrate@gmail.com</li>
              <li>Instagram: @songrate</li>
              <li>Twitter: @songrate</li>
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
