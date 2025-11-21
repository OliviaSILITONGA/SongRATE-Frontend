import Navbar from "../components/Navbar";
import AlbumCard from "../components/AlbumCard";
import ReviewCard from "../components/ReviewCard";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="text-left mt-40">
        <h1 className="text-4xl font-extrabold tracking-wide leading-tight px-10">
          Discover.Rate.Share your music world.
        </h1>

        <h1 className="text-4xl font-bold tracking-wide leading-tight px-10">
          Keep track of every song and album you love. Express your thoughts
          through reviews and ratings.
        </h1>
      </section>

      {/* DESCRIPTION */}
      <section className="text-right mt-24">
        <p className="text-gray-300 mt-4 text-xl px-10 py-4">
          Songrate is a social platform for music lovers. A place to explore,
          rate, and discuss your favorite tracks with friends. Build your music
          journal, share opinions, and connect through the sound that moves you.
        </p>
      </section>

      {/* CTA BUTTON */}
      <section className="text-center mt-24">
        <Link
          to="/signup"
          className="px-10 py-4 bg-[#3E424B] border-4 text-yellow-400 font-semibold rounded-xl hover:bg-[#3E424B]"
        >
          Join for free!
        </Link>
      </section>

      {/* POPULAR ALBUMS */}
      <section className="mt-24 px-20">
        <h2 className="text-3xl font-semibold mb-6">Popular Albums</h2>

        <div className="flex gap-6 flex-wrap">
          <AlbumCard
            title="Eternal Sunshine"
            image="https://placehold.co/250"
          />
          <AlbumCard
            title="The Life of a Showgirl"
            image="https://placehold.co/250"
          />
          <AlbumCard
            title="Debi Titar Mas Fotos"
            image="https://placehold.co/250"
          />
          <AlbumCard title="Music" image="https://placehold.co/250" />
        </div>
      </section>

      {/* POPULAR REVIEWS */}
      <section className="mt-20 px-20 mb-32">
        <h2 className="text-3xl font-semibold mb-6">Popular Reviews</h2>

        <div className="flex gap-8 flex-wrap">
          <ReviewCard
            image="https://placehold.co/100"
            name="Alvian Kathur"
            review="Salah satu album terbaik yang pernah saya dengar."
          />
          <ReviewCard
            image="https://placehold.co/100"
            name="Dinda Rahmah"
            review="Flow-nya nyaman banget dan bikin nagih!"
          />
          <ReviewCard
            image="https://placehold.co/100"
            name="Jonathan Silalahi"
            review="Album ini bener-bener masterpiece."
          />
        </div>
      </section>

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
