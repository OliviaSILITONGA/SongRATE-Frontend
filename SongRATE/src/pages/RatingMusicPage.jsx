import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "../components/Home";
import ReviewSongs from "../components/ReviewSongs";
import SongRatingCard from "../components/SongRatingCard";

// Import gambar
import TaylorSwift from "../assets/Showgirl.png";
import HUNTRIX from "../assets/HUNTRIX.jpg";
import AlexWarren from "../assets/MOON.png";
import sombr from "../assets/22.png";
import RAYE from "../assets/HEART.png";

// DATA REVIEW / NEWEST RATING
const newest = [
  {
    username: "Samosa",
    reviewerHandle: "Samosa",
    time: "1h",
    likes: 14,
    rating: 5,
    image: "/images/user1.jpg",
    songImage: "/images/chanel.jpg",
    title: "CHANEL",
    artist: "Tyla",
    review: "Tyla's 'CHANEL' totally slaps — it's got that smooth Amapiano-Afrobeat groove that makes you wanna move without even thinking.",
  },
  {
    username: "AnakDesa",
    reviewerHandle: "AnakDesa",
    time: "1h",
    likes: 11,
    rating: 4,
    image: "/images/user2.jpg",
    songImage: "/images/horreg.jpg",
    title: "hoRRReg",
    artist: "Jemsii, Naufal Syachreza, and Tenxi",
    review: "Lagu 'Horrreg' saka Tenxi iku keren, ketukane nendang, lirike unik, lan getarane pancen unik.",
  },
  {
    username: "DavidJo",
    reviewerHandle: "DavidJo",
    time: "4h",
    likes: 43,
    rating: 3,
    image: "/images/user3.jpg",
    songImage: "/images/messy.jpg",
    title: "Messy",
    artist: "Lola Young",
    review: "'Messy' by Lola Young really lives up to its title — it feels all over the place.",
  },
  {
    username: "DavidJo",
    reviewerHandle: "DavidJo",
    time: "6h",
    likes: 97,
    rating: 2,
    image: "/images/user3.jpg",
    songImage: "/images/sugar.jpg",
    title: "Sugar On My Tongue",
    artist: "Tyler, The Creator",
    review: "It was legendary... until everyone and their mom started playing it. Welcome to the Overplayed Music Club, Tyler.",
  },
];

export default function MusicRatings() {
  const containerRef = useRef(null);

  // Animasi untuk scroll reveal (tetap dipertahankan)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Animasi varians tanpa opacity
  const containerVariants = {
    hidden: { },
    visible: { 
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20 },
    visible: { 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-bl from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white pt-24 pb-16 px-4 md:px-10">
      <Home />

      {/* HERO SECTION tanpa animasi fade */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center justify-between mt-10 gap-8 animate-on-scroll"
      >
        <div className="text-left max-w-xl">
          <motion.h1 
            initial={{ x: -30 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
          >
            Music Ratings
          </motion.h1>
          <motion.p 
            initial={{ x: -30 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 font-medium text-base md:text-lg lg:text-xl"
          >
            Discover the most popular songs rated by the community. Vote your favorite music too!
          </motion.p>
        </div>

        <motion.img
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          src={TaylorSwift}
          alt="Album"
          className="w-60 h-60 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-xl object-cover shadow-xl hidden md:block transform hover:scale-105 transition-transform duration-300"
        />
      </motion.div>

      {/* TOP 5 SECTION */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        ref={containerRef}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-2xl md:text-3xl font-bold mt-16 mb-6 animate-on-scroll"
        >
          Top 5 Songs Rating This Week
        </motion.h2>

        <div className="flex flex-col items-center gap-10 mt-10">
          {[
            { number: "1.", title: "The Fate of Ophelia", artist: "Taylor Swift", cover: TaylorSwift },
            { number: "2.", title: "Golden", artist: "HUNTR/X...", cover: HUNTRIX },
            { number: "3.", title: "Ordinary", artist: "Alex Warren", cover: AlexWarren },
            { number: "4.", title: "back to friends", artist: "sombr", cover: sombr },
            { number: "5.", title: "WHERE IS MY HUSBAND!", artist: "RAYE", cover: RAYE },
          ].map((song, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="animate-on-scroll w-full max-w-4xl"
              initial={{ x: idx % 2 === 0 ? -50 : 50 }}
              animate={{ x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <SongRatingCard
                number={song.number}
                title={song.title}
                artist={song.artist}
                albumCover={song.cover}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* RATE BUTTON */}
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center mt-12 animate-on-scroll"
      >
        <Link
          to="/rate"
          className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg text-base md:text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30"
        >
          Rate Your Favorite Music
        </Link>
      </motion.div>

      {/* NEWEST RATINGS SECTION */}
      <motion.div
        transition={{ delay: 1 }}
        className="mt-16"
      >
        <motion.h2 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.1 }}
          className="text-xl md:text-2xl font-bold mb-6 animate-on-scroll"
        >
          Newest Rating
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
        >
          {newest.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="animate-on-scroll"
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ delay: idx * 0.15 }}
            >
              <ReviewSongs
                image={item.image}
                name={item.time}
                review={item.review}
                rating={item.rating}
                likes={item.likes}
                reviewer={item.username}
                reviewerHandle={item.reviewerHandle}
                songTitle={item.title}
                artist={item.artist}
                songImage={item.songImage}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* FOOTER */}
      <motion.footer 
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.5 }}
        className="bg-[#3E424B85] text-gray-300 py-10 px-4 md:px-20 mt-20"
      >
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
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                </svg>
                Instagram
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.279 16.736 5.018 15.022 5 12c.018-3.024.279-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.721 7.264 18.982 8.978 19 12c-.018 3.024-.279 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
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
      </motion.footer>
    </div>
  );
}