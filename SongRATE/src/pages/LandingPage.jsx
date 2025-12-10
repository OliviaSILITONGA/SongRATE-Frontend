import { useEffect } from "react";
import Navbar from "../components/Navbar";
import AlbumCard from "../components/AlbumCard";
import ReviewCard from "../components/ReviewCard";
import ArianaGrande from "../assets/EternalSunshine.png";
import TaylorSwift from "../assets/Showgirl.png";
import BadBunny from "../assets/Debi_Titar.png";
import PlayboiCarti from "../assets/Playboy.png";
import { Link } from "react-router-dom";

export default function LandingPage() {
  // === SCROLL REVEAL ANIMATION ===
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="px-4 sm:px-6 lg:px-10 mt-20 md:mt-32 lg:mt-40">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide leading-tight reveal text-center md:text-left">
            Discover. Rate. Share your music world.
          </h1>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide leading-tight mt-3 md:mt-4 reveal text-center md:text-left">
            Keep track of every song and album you love. Express your thoughts
            through reviews and ratings.
          </h1>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="px-4 sm:px-6 lg:px-10 mt-16 md:mt-20 lg:mt-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-base sm:text-lg md:text-xl reveal text-center md:text-right">
            Songrate is a social platform for music lovers. A place to explore,
            rate, and discuss your favorite tracks with friends. Build your music
            journal, share opinions, and connect through the sound that moves you.
          </p>
        </div>
      </section>

      {/* CTA BUTTON */}
      <section className="mt-16 md:mt-20 lg:mt-24 reveal flex justify-center">
        <Link
          to="/signup"
          className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 bg-[#3E424B] border-4 text-yellow-400 font-semibold rounded-xl hover:bg-[#4A4E57] transition-colors duration-300 text-sm sm:text-base md:text-lg"
        >
          Join for free!
        </Link>
      </section>

      {/* === POPULAR ALBUMS THIS WEEK === */}
      <div className="mt-16 md:mt-20 lg:mt-24 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-8 reveal">
            Popular Albums This Week
          </h2>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="reveal">
              <AlbumCard
                title="Eternal Sunshine"
                artist="Ariana Grande"
                rating="4.9"
                image={ArianaGrande}
              />
            </div>

            <div className="reveal">
              <AlbumCard
                title="The Life of a Showgirl"
                artist="Taylor Swift"
                rating="4.9"
                image={TaylorSwift}
              />
            </div>

            <div className="reveal">
              <AlbumCard
                title="Debi Titar Mas Fotos"
                artist="Bad Bunny"
                rating="4.7"
                image={BadBunny}
              />
            </div>

            <div className="reveal">
              <AlbumCard
                title="Music"
                artist="Playboi Carti"
                rating="4.7"
                image={PlayboiCarti}
              />
            </div>
          </div>
        </div>
      </div>

      {/* POPULAR REVIEWS */}
      <section className="mt-16 md:mt-20 lg:mt-24 px-4 sm:px-6 lg:px-10 mb-16 md:mb-24 lg:mb-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 md:mb-8 reveal">
            Popular Reviews
          </h2>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-4 sm:gap-6 md:gap-8">
            <div className="reveal flex justify-center">
              <ReviewCard
                songTitle="Rather Lie (with The Weeknd)"
                artist="Playboy Cart, The Weeknd"
                review="A heartfelt track that blends smooth vocals with emotional lyrics. It captures the pain of pretending everything's fine when it's not."
                rating={5}
                likes={12}
                image="/path-to-avatar.jpg"
                songImage="/path-to-song-cover.jpg"
                reviewer="TheGrishofChristmas"
                reviewerHandle="TheGrishofChristmas"
              />
            </div>

            <div className="reveal flex justify-center">
              <ReviewCard
                songTitle="Espresso"
                artist="Sabrina Carpenter"
                review="Catchy, playful, and effortlessly confident. Sabrina mixes cheeky lyrics with a groovy pop beat that sticks in your head instantly."
                rating={4}
                likes={395}
                image="/path-to-avatar2.jpg"
                songImage="/path-to-song-cover2.jpg"
                reviewer="Samosa"
                reviewerHandle="Samosa"
              />
            </div>

            <div className="reveal flex justify-center">
              <ReviewCard
                songTitle="WHERE IS MY HUSBAND!"
                artist="RAYE"
                review="RAYE delivers raw emotion and biting honesty in this theatrical piece. Her vocals shift from heartbreak to frustration with powerful storytelling."
                rating={5}
                likes={315}
                image="/path-to-avatar3.jpg"
                songImage="/path-to-song-cover3.jpg"
                reviewer="DangduduLife"
                reviewerHandle="DangduduLife"
              />
            </div>
          </div>
        </div>
      </section>

       {/* FOOTER */}
      <footer className="bg-[#3E424B85] text-gray-300 py-10 px-4 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* CONTACT */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Text Message
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
                Instagram
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.279 16.736 5.018 15.022 5 12c.018-3.024.279-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.721 7.264 18.982 8.978 19 12c-.018 3.024-.279 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/>
                </svg>
                TikTok
              </li>
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
                className="w-full px-4 py-2 rounded-l-lg bg-[#3E424B] text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="bg-yellow-500 px-4 rounded-r-lg hover:bg-yellow-600 transition duration-300">
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