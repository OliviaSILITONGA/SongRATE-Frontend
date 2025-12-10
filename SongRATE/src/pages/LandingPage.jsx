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
      <footer className="bg-[#3E424B85] text-gray-300 py-8 md:py-10 px-4 sm:px-6 lg:px-10 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* CONTACT */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4">Contact</h2>
              <ul className="space-y-2 text-sm md:text-base">
                <li>Email: songrate@gmail.com</li>
                <li>Instagram: @songrate</li>
                <li>Twitter: @songrate</li>
              </ul>
            </div>

            {/* SUBSCRIBE */}
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                Subscribe to Us
              </h2>
              <p className="text-sm md:text-base mb-3 md:mb-4">
                We'll send you the latest releases, news, and offers.
              </p>

              <div className="flex max-w-md">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 sm:px-4 py-2 rounded-l-lg bg-[#3E424B] text-gray-200 focus:outline-none text-sm md:text-base"
                />
                <button className="bg-yellow-500 px-3 sm:px-4 rounded-r-lg hover:bg-yellow-600 transition-colors duration-300">
                  <svg width="20" height="20" fill="black" viewBox="0 0 24 24">
                    <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-500 text-xs sm:text-sm mt-8 md:mt-10">
            © 2025 SongRate
          </div>
        </div>
      </footer>
    </div>
  );
}