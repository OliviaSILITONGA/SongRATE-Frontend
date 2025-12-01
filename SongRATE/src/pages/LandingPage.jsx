import { useEffect } from "react";
import Navbar from "../components/Navbar";
import AlbumCard from "../components/AlbumCard";
import ReviewCard from "../components/ReviewCard";
import ArianaGrande from "../assets/images/EternalSunshine.png";
import TaylorSwift from "../assets/images/Showgirl.png";
import BadBunny from "../assets/images/Debi_Titar.png";
import PlayboiCarti from "../assets/images/Playboy.png";
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
      { threshold: 0.2 }
    );

    revealElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="text-left mt-40 px-10">
        <h1 className="text-6xl font-extrabold tracking-wide leading-tight reveal">
          Discover. Rate. Share your music world.
        </h1>

        <h1 className="text-4xl font-bold tracking-wide leading-tight mt-3 reveal">
          Keep track of every song and album you love. Express your thoughts
          through reviews and ratings.
        </h1>
      </section>

      {/* DESCRIPTION */}
      <section className="text-right text-2xl mt-24 px-10 py-4">
        <p className="text-gray-300 text-xl reveal">
          Songrate is a social platform for music lovers. A place to explore,
          rate, and discuss your favorite tracks with friends. Build your music
          journal, share opinions, and connect through the sound that moves you.
        </p>
      </section>

      {/* CTA BUTTON */}
      <section className="text-center mt-24 reveal">
        <Link
          to="/signup"
          className="px-10 py-4 bg-[#3E424B] border-4 text-yellow-400 font-semibold rounded-xl hover:bg-[#3E424B]"
        >
          Join for free!
        </Link>
      </section>

      {/* === POPULAR ALBUMS THIS WEEK === */}
      <div className="mt-20 px-8">
        <h2 className="text-2xl font-bold mb-6 reveal">
          Popular Albums This Week
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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

      {/* POPULAR REVIEWS */}
      <section className="mt-20 px-20 mb-32">
        <h2 className="text-3xl font-semibold mb-6 reveal">Popular Reviews</h2>

        <div className="flex gap-8 flex-wrap">
          <div className="reveal">
            <ReviewCard
              image="https://placehold.co/100"
              name="Alvian Kathur"
              review="Salah satu album terbaik yang pernah saya dengar."
            />
          </div>

          <div className="reveal">
            <ReviewCard
              image="https://placehold.co/100"
              name="Dinda Rahmah"
              review="Flow-nya nyaman banget dan bikin nagih!"
            />
          </div>

          <div className="reveal">
            <ReviewCard
              image="https://placehold.co/100"
              name="Jonathan Silalahi"
              review="Album ini bener-bener masterpiece."
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#3E424B85] text-gray-300 py-10 px-20 reveal">
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
