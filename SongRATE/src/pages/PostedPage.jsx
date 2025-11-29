import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom";

export default function PostedPage() {
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setFade(true), 50);
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-bl from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white transition-all duration-700 ${
        fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <Menu />

      {/* MAIN CONTENT */}
      <div className="flex flex-col items-center pt-40 pb-32 px-6 text-center select-none">
        {/* CHECKMARK ANIMATION */}
        <div
          className={`text-[#FFCC00] text-8xl mb-6 font-bold transition-all duration-700 ease-out ${
            fade
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 rotate-6"
          }`}
        >
          {"\u2713"}
        </div>

        {/* POSTED! TEXT */}
        <h1
          className={`text-6xl md:text-7xl font-extrabold text-yellow-400 drop-shadow-[0_0_18px_rgba(255,200,0,0.4)]
          transition-opacity duration-1000 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          Posted!
        </h1>

        {/* BUTTONS */}
        <div className="mt-12 space-y-4 w-full max-w-xs">
          <button className="w-full bg-black/70 py-3 rounded-xl font-medium hover:scale-[1.04] hover:bg-black/80 transition-all duration-300 shadow-lg">
            View Ratings
          </button>

          <button
            onClick={() => navigate("/home")}
            className="w-full bg-gray-500/40 py-3 rounded-xl font-medium hover:scale-[1.04] transition-all duration-300 shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#3E424B85] text-gray-300 py-10 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* CONTACT */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">Contact</h2>
            <ul className="space-y-2 text-sm md:text-base">
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
                <svg width="22" height="22" fill="black" viewBox="0 0 24 24">
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
