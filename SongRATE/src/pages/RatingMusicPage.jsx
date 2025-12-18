import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "../components/Home";
import ReviewSongs from "../components/ReviewSongs";
import SongRatingCard from "../components/SongRatingCard";

// Import gambar statis
import TaylorSwift from "../assets/Showgirl.png";
import HUNTRIX from "../assets/HUNTRIX.jpg";
import AlexWarren from "../assets/MOON.png";
import sombr from "../assets/22.png";
import RAYE from "../assets/HEART.png";

// Placeholder images
import DefaultUser from "../assets/SongRATE_White.png";
import DefaultSong from "../assets/SongRATE_White.png";

// Import more song images for mapping
import EternalSunshine from "../assets/EternalSunshine.png";
import ArianaGrande from "../assets/Ariana_Grande.png";
import BillieEilish from "../assets/Billie_Ellish.png";
import BrunoMars from "../assets/Bruno_Mars.jpg";
import ThWeeknd from "../assets/The_Weeknd.png";
import SZA from "../assets/SZA.png";
import KendrickLamar from "../assets/Kendrick_Lamar.png";
import DojaCat from "../assets/Doja_Cat.png";
import BadBunny from "../assets/Bad_Bunny.png";
import JustinBieber from "../assets/Justin_Bieber.png";

// Mapping judul lagu ke gambar cover
const songImageMap = {
  // Taylor Swift songs
  "the fate of ophelia": TaylorSwift,
  "showgirl": TaylorSwift,
  // HUNTRX songs
  "golden": HUNTRIX,
  // Alex Warren songs
  "ordinary": AlexWarren,
  "moon": AlexWarren,
  // sombr songs
  "back to friends": sombr,
  "22": sombr,
  // RAYE songs
  "where is my husband!": RAYE,
  "heart": RAYE,
  // Ariana Grande
  "eternal sunshine": EternalSunshine,
  "we can't be friends": ArianaGrande,
  "yes, and?": ArianaGrande,
  // Billie Eilish
  "birds of a feather": BillieEilish,
  "lunch": BillieEilish,
  // Bruno Mars
  "apt.": BrunoMars,
  "die with a smile": BrunoMars,
  // The Weeknd
  "blinding lights": ThWeeknd,
  "save your tears": ThWeeknd,
  // SZA
  "kill bill": SZA,
  "snooze": SZA,
  // Kendrick Lamar
  "not like us": KendrickLamar,
  "humble": KendrickLamar,
  // Doja Cat
  "paint the town red": DojaCat,
  "woman": DojaCat,
  // Bad Bunny
  "monaco": BadBunny,
  "tití me preguntó": BadBunny,
  // Justin Bieber
  "peaches": JustinBieber,
  "ghost": JustinBieber,
};

// Helper function to get song image based on title
const getSongImage = (title) => {
  if (!title) return DefaultSong;
  const normalizedTitle = title.toLowerCase().trim();
  return songImageMap[normalizedTitle] || DefaultSong;
};

export default function MusicRatings() {
  const containerRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi Helper Time Ago
  const timeAgo = (date) => {
    if (!date) return "just now";
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 3600;
    if (interval > 24) return Math.floor(interval / 24) + "d";
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return "now";
  };

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch Data
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/api/reviews`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const data = await response.json();
          // Validasi agar yang masuk state selalu array
          setReviews(Array.isArray(data) ? data : []);
        } else {
          console.error("Failed to fetch reviews:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Animasi Scroll
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
  }, [reviews]);

  const containerVariants = {
    hidden: {},
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

      {/* HERO SECTION */}
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

        {loading ? (
          <p className="text-gray-400">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-400">No ratings yet. Be the first to rate!</p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
          >
            {reviews.map((item, idx) => {
              // Handle potential nested user object (e.g. item.User or item.user)
              const userObj = item.User || item.user || {};
              const username = item.username || userObj.username || "Anonymous";
              const userHandle = item.username || userObj.username || "user";
              const userImage = item.user_image || item.userImg || userObj.image || userObj.profileImage || DefaultUser;

              return (
                <motion.div
                  key={item.id || idx}
                  variants={itemVariants}
                  className="animate-on-scroll"
                  initial={{ y: 30 }}
                  animate={{ y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <ReviewSongs
                    reviewId={item.id || `review-${idx}`}
                    reviewer={username}
                    reviewerHandle={userHandle}
                    name={timeAgo(item.createdAt)}
                    likes={item.likes || 0}
                    rating={item.rating}
                    review={item.message}
                    songTitle={item.title}
                    artist={item.artist}
                    songImage={getSongImage(item.title)}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </motion.div>

      {/* FOOTER */}
      <motion.footer
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.5 }}
        className="bg-[#3E424B85] text-gray-300 py-10 px-4 md:px-20 mt-20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <ul className="space-y-2">
              <li className="flex items-center">Text Message</li>
              <li className="flex items-center">Instagram</li>
              <li className="flex items-center">TikTok</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Subscribe to Us</h2>
            <div className="flex">
              <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-l-lg bg-[#3E424B] text-gray-200 outline-none" />
              <button className="bg-yellow-500 px-4 rounded-r-lg text-black font-bold"></button>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-10">© 2025 SongRate</div>
      </motion.footer>
    </div>
  );
}