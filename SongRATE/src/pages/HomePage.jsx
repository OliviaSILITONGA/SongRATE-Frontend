import Home from "../components/Home";
import Banner from "../components/Banner";
import SongRatingCard from "../components/SongRatingCard";
import AlbumCard from "../components/AlbumCard";
import ArianaGrande from "../assets/EternalSunshine.png";
import TaylorSwift from "../assets/Showgirl.png";
import BadBunny from "../assets/Debi_Titar.png";
import PlayboiCarti from "../assets/Playboy.png";
import HUNTRIX from "../assets/HUNTRIX.jpg";
import AlexWarren from "../assets/MOON.png";
import sombr from "../assets/22.png";
import RAYE from "../assets/HEART.png";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white">
      <Home />
      <Banner />

      {/* Section Title */}
      <h2 className="text-5xl text-center font-bold mt-20">
        Top 5 Songs Rating This Week
      </h2>

      {/* Songs List */}
      <div className="flex flex-col bg-transparent items-center gap-10 mt-10">
        <SongRatingCard
          number="1."
          title="The Fate of Ophelia"
          artist="Taylor Swift"
          albumCover={TaylorSwift}
        />
        <SongRatingCard
          number="2."
          title="Golden"
          artist="HUNTR/X, EJAE, AUDREY NUNA, REI AMI & KPop Demon Hunters Cast"
          albumCover={HUNTRIX}
        />
        <SongRatingCard
          number="3."
          title="Ordinary"
          artist="Alex Warren"
          albumCover={AlexWarren}
        />
        <SongRatingCard
          number="4."
          title="back to friends"
          artist="sombr"
          albumCover={sombr}
        />
        <SongRatingCard
          number="5."
          title="WHERE IS MY HUSBAND!"
          artist="RAYE"
          albumCover={RAYE}
        />
      </div>

      {/* Rate Your Favorite Music Button */}
      <div className="flex justify-center mt-12">
        <Link
          to="/rate"
          className="bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg text-lg hover:bg-yellow-400 transition"
        >
          Rate Your Favorite Music
        </Link>
      </div>

      {/* Search Section */}
      <div className="flex justify-center mt-8 mb-20">
        <div className="relative w-full max-w-2xl mx-8">
          <input
            type="text"
            placeholder="Find Artist, Albums or Artist"
            className="w-full px-6 py-4 rounded-full bg-[#3E424B] text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 pl-12"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* === POPULAR ALBUMS THIS WEEK === */}
      <div className="mt-20 px-8 mb-10">
        <h2 className="text-2xl font-bold mb-6">Popular Albums This Week</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <AlbumCard
            title="Eternal Sunshine"
            artist="Ariana Grande"
            rating="4.9"
            image={ArianaGrande}
          />

          <AlbumCard
            title="The Life of a Showgirl"
            artist="Taylor Swift"
            rating="4.9"
            image={TaylorSwift}
          />

          <AlbumCard
            title="Debi Titar Mas Fotos"
            artist="Bad Bunny"
            rating="4.7"
            image={BadBunny}
          />

          <AlbumCard
            title="Music"
            artist="Playboi Carti"
            rating="4.7"
            image={PlayboiCarti}
          />
        </div>
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
