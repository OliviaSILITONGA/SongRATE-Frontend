import Navbar from "../components/Navbar";
import AlbumCard from "../components/AlbumCard";
import ReviewCard from "../components/ReviewCard";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0c1b33] text-white">
      <Navbar />

      {/* HERO */}
      <section className="text-left mt-24">
        <h1 className="text-4xl font-extrabold tracking-wide leading-tight">
          Discover.Rate.Share your music world.
        </h1>

        <h1 className="text-4xl font-bold tracking-wide leading-tight">
          Keep track of every song and album you love. Express your thoughts
          through reviews and ratings.
        </h1>
      </section>

      <section className="text-right mt-24">
        <p className="text-gray-300 mt-4 text-lg">
          Songrate is a social platform for music lovers. A place to explore,
          rate, and discuss your favorite tracks with friends. Build your music
          journal, share opinions, and connect through the sound that moves you.
        </p>
      </section>

      <section className="text-center mt-24">
        <Link
          to="/signup"
          className="px-10 py-4 bg-[#3E424B] border-4 text-yellow-400 font-semibold  rounded-xl hover:bg-[#3E424B]"
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
      <footer className="bg-[#0a0a0a] py-16 px-20">
        <h2 className="text-2xl font-bold mb-4">Contact</h2>

        <div className="flex flex-col gap-2 text-gray-300">
          <a>Email: songrate@gmail.com</a>
          <a>Instagram: @songrate</a>
          <a>Twitter: @songrate</a>
        </div>

        <div className="mt-8">
          <p className="text-gray-400 font-bold mb-2">Subscribe to us</p>
          <p className="text-gray-400 mb-2">
            We’ll send you the latest releases, news, and offers.
          </p>
          <input
            className="px-4 py-2 rounded-l-xl bg-gray-700 text-white"
            placeholder="Email"
          />
          <button className="px-5 py-2 bg-yellow-400 text-black rounded-r-xl font-semibold">
            Subscribe
          </button>
        </div>
      </footer>
    </div>
  );
}
