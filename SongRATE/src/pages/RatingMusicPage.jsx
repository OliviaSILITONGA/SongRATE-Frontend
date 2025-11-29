import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Home from "../components/Home";

// DATA TOP 5 SONGS (PERSIS SEPERTI GAMBAR)
const topSongs = [
  {
    rank: 1,
    title: "The Fate of Ophelia",
    artist: "Taylor Swift",
    image: "/images/ophelia.jpg",
    rating: 5,
    total: "1,156 ratings",
  },
  {
    rank: 2,
    title: "Golden",
    artist: "Jungle",
    image: "/images/golden.jpg",
    rating: 5,
    total: "1,078 ratings",
  },
  {
    rank: 3,
    title: "Ordinary",
    artist: "Alex Warren",
    image: "/images/ordinary.jpg",
    rating: 5,
    total: "987 ratings",
  },
  {
    rank: 4,
    title: "back to friends",
    artist: "sombir",
    image: "/images/backtofriends.jpg",
    rating: 5,
    total: "956 ratings",
  },
  {
    rank: 5,
    title: "WHERE IS MY HUSBAND!",
    artist: "RAYE",
    image: "/images/wimh.jpg",
    rating: 5,
    total: "912 ratings",
  },
];

// DATA REVIEW / NEWEST RATING
const newest = [
  {
    username: "Nova Rosalia",
    time: "1h ago",
    likes: 14,
    rating: 5,
    image: "/images/ophelia.jpg",
    title: "The Fate of Ophelia",
    artist: "Taylor Swift",
    review:
      "What a beautiful heart break album, Taylor is definitely a genius!",
  },
  {
    username: "Efraim Lee",
    time: "4h ago",
    likes: 11,
    rating: 5,
    image: "/images/golden.jpg",
    title: "Golden",
    artist: "Jungle",
    review: "The groove and vocals are unmatched.",
  },
  {
    username: "Hendra Wijaya",
    time: "6h ago",
    likes: 43,
    rating: 5,
    image: "/images/backtofriends.jpg",
    title: "back to friends",
    artist: "sombir",
    review: "This song hits deep… relatable and emotional.",
  },
  {
    username: "Hendra Wijaya",
    time: "6h ago",
    likes: 97,
    rating: 5,
    image: "/images/wimh.jpg",
    title: "WHERE IS MY HUSBAND!",
    artist: "RAYE",
    review: "Such a masterpiece. RAYE never disappoints.",
  },
];

export default function MusicRatings() {
  return (
    <div className="w-full min-h-screen bg-[#0e0e0e] text-white pt-32 pb-20 px-6">
      <Home />
      {/* TITLE */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-3">Music Ratings</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Discover the most popular songs rated by the community. Vote your
          favorite music too!
        </p>
      </div>

      {/* TOP 5 */}
      <h2 className="text-2xl font-bold mt-16 mb-6">
        Top 5 Songs Rating This Week
      </h2>
      <div className="space-y-5">
        {topSongs.map((song, index) => (
          <div
            key={index}
            className="bg-[#1b1b1b] rounded-2xl p-5 flex items-center gap-4 shadow-lg border border-white/5"
          >
            <div className="text-3xl font-bold text-yellow-400 w-10 text-center">
              {song.rank}
            </div>

            <img
              src={song.image}
              alt={song.title}
              className="w-20 h-20 rounded-xl object-cover"
            />

            <div className="flex-1">
              <h3 className="text-lg font-semibold">{song.title}</h3>
              <p className="text-gray-400">{song.artist}</p>

              <div className="flex items-center gap-1 mt-1">
                {[...Array(song.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
                <span className="text-gray-400 text-sm ml-2">{song.total}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BUTTON RATE */}
      <div className="text-center mt-10">
        <Link
          to="/rate"
          className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition"
        >
          Rate Your Favorite Music
        </Link>
      </div>

      {/* NEWEST RATING */}
      <h2 className="text-2xl font-bold mt-16 mb-6">Newest Rating</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {newest.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#1b1b1b] p-6 rounded-2xl shadow-lg border border-white/5 flex gap-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 rounded-xl object-cover"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-400">{item.artist}</p>

              <div className="flex items-center gap-1 my-1">
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              <p className="text-sm text-gray-300 italic">"{item.review}"</p>

              <div className="flex justify-between mt-3 text-sm text-gray-400">
                <span>
                  {item.username} · {item.time}
                </span>
                <span>❤️ {item.likes}</span>
              </div>
            </div>
          </div>
        ))}
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
