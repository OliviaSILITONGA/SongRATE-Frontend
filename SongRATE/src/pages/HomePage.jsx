import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const fadeInUpVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const scaleVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-bl 
      from-[#2E333E] via-[#1C1F26] to-[#171A1F]
      text-white overflow-x-hidden"
    >
      <Home />

      <div className="pt-20 md:pt-28"></div>

      {/* Banner */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="px-4 md:px-8"
      >
        <Banner />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold 
        mt-16 md:mt-20 mb-8 md:mb-10 px-4"
      >
        Top 5 Songs Rating This Week
      </motion.h2>

      {/* Songs List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6 px-4 md:px-8 max-w-3xl mx-auto mt-8"
      >
        {[
          {
            number: "1.",
            title: "The Fate of Ophelia",
            artist: "Taylor Swift",
            albumCover: TaylorSwift,
            ratings: "1,158 ratings",
          },
          {
            number: "2.",
            title: "Golden",
            artist:
              "HUNTR/X, EJAE, AUDREY NUNA, REI AMI & KPop Demon Hunters Cast",
            albumCover: HUNTRIX,
            ratings: "1,078 ratings",
          },
          {
            number: "3.",
            title: "Ordinary",
            artist: "Alex Warren",
            albumCover: AlexWarren,
            ratings: "997 ratings",
          },
          {
            number: "4.",
            title: "back to friends",
            artist: "sombr",
            albumCover: sombr,
            ratings: "956 ratings",
          },
          {
            number: "5.",
            title: "WHERE IS MY HUSBAND!",
            artist: "RAYE",
            albumCover: RAYE,
            ratings: "912 ratings",
          },
        ].map((song, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <SongRatingCard {...song} />
          </motion.div>
        ))}
      </motion.div>

      {/* Button */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex justify-center mt-10 md:mt-12 px-4"
      >
        <Link
          to="/rate"
          className="bg-yellow-500 text-black font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg
          text-base md:text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105
          shadow-lg hover:shadow-xl shadow-yellow-500/20 hover:shadow-yellow-500/30"
        >
          Rate Your Favorite Music
        </Link>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="flex justify-center mt-8 md:mt-12 mb-16 md:mb-20 px-4"
      >
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Find Artist, Albums or Artist"
            className="w-full px-6 py-3 md:py-4 rounded-full bg-[#3E424B] text-gray-200
            focus:outline-none focus:ring-2 focus:ring-yellow-500 pl-12 md:pl-14 text-sm md:text-base
            transition-all duration-300 focus:scale-105"
          />
          <svg
            className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
      </motion.div>

      {/* Albums */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="mt-16 md:mt-20 px-4 md:px-8 mb-10 md:mb-16 max-w-7xl mx-auto"
      >
        <motion.h2 variants={fadeInUpVariants} className="text-xl md:text-2xl font-bold mb-6">
          Popular Albums This Week
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            {
              title: "Eternal Sunshine",
              artist: "Ariana Grande",
              rating: "4.9",
              image: ArianaGrande,
            },
            {
              title: "The Life of a Showgirl",
              artist: "Taylor Swift",
              rating: "4.9",
              image: TaylorSwift,
            },
            {
              title: "Debi Titar Mas Fotos",
              artist: "Bad Bunny",
              rating: "4.7",
              image: BadBunny,
            },
            {
              title: "Music",
              artist: "Playboi Carti",
              rating: "4.7",
              image: PlayboiCarti,
            },
          ].map((album, index) => (
            <motion.div
              key={index}
              variants={scaleVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <AlbumCard {...album} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FOOTER */}
      <motion.footer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="bg-[#3E424B85] text-gray-300 py-10 px-4 md:px-20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* CONTACT */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
          >
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
          </motion.div>

          {/* SUBSCRIBE */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
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
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-gray-500 text-sm mt-10"
        >
          © 2025 SongRate
        </motion.div>
      </motion.footer>
    </motion.div>
  );
}