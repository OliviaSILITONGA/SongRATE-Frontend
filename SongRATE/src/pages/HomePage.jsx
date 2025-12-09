import { useState, useEffect } from "react";
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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white overflow-x-hidden">
      <Home />

      <div className="pt-28"></div>
      <Banner />
      
      {/* Banner dengan animasi */}
      <div className="relative mt-8 mx-4 md:mx-8 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 opacity-80 animate-gradient-x"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-20 translate-y-20"></div>
      </div>

      {/* Section Title dengan animasi */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold mt-16 md:mt-20 mb-8 md:mb-10 px-4 animate-fade-in">
        Top 5 Songs Rating This Week
      </h2>

      {/* Songs List - Responsive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 px-4 md:px-8 max-w-7xl mx-auto mt-8">
        {[
          {
            number: "1.",
            title: "The Fate of Ophelia",
            artist: "Taylor Swift",
            albumCover: TaylorSwift,
            ratings: "1,158 ratings"
          },
          {
            number: "2.",
            title: "Golden",
            artist: "HUNTR/X, EJAE, AUDREY NUNA, REI AMI & KPop Demon Hunters Cast",
            albumCover: HUNTRIX,
            ratings: "1,078 ratings"
          },
          {
            number: "3.",
            title: "Ordinary",
            artist: "Alex Warren",
            albumCover: AlexWarren,
            ratings: "997 ratings"
          },
          {
            number: "4.",
            title: "back to friends",
            artist: "sombr",
            albumCover: sombr,
            ratings: "956 ratings"
          },
          {
            number: "5.",
            title: "WHERE IS MY HUSBAND!",
            artist: "RAYE",
            albumCover: RAYE,
            ratings: "912 ratings"
          }
        ].map((song, index) => (
          <div 
            key={index} 
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <SongRatingCard
              number={song.number}
              title={song.title}
              artist={song.artist}
              albumCover={song.albumCover}
              ratings={song.ratings}
            />
          </div>
        ))}
      </div>

      {/* Rate Your Favorite Music Button dengan animasi */}
      <div className="flex justify-center mt-10 md:mt-12 px-4 animate-fade-in-up">
        <Link
          to="/rate"
          className="bg-yellow-500 text-black font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-base md:text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse-subtle"
        >
          Rate Your Favorite Music
        </Link>
      </div>

      {/* Search Section */}
      <div className="flex justify-center mt-8 md:mt-12 mb-16 md:mb-20 px-4">
        <div className="relative w-full max-w-2xl animate-fade-in">
          <input
            type="text"
            placeholder="Find Artist, Albums or Artist"
            className="w-full px-6 py-3 md:py-4 rounded-full bg-[#3E424B] text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 pl-12 md:pl-14 text-sm md:text-base transition-all duration-300"
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
      </div>

      {/* === POPULAR ALBUMS THIS WEEK === */}
      <div className="mt-16 md:mt-20 px-4 md:px-8 mb-10 md:mb-16 max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-6 animate-fade-in">
          Popular Albums This Week
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            {
              title: "Eternal Sunshine",
              artist: "Ariana Grande",
              rating: "4.9",
              image: ArianaGrande
            },
            {
              title: "The Life of a Showgirl",
              artist: "Taylor Swift",
              rating: "4.9",
              image: TaylorSwift
            },
            {
              title: "Debi Titar Mas Fotos",
              artist: "Bad Bunny",
              rating: "4.7",
              image: BadBunny
            },
            {
              title: "Music",
              artist: "Playboi Carti",
              rating: "4.7",
              image: PlayboiCarti
            }
          ].map((album, index) => (
            <div 
              key={index} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <AlbumCard
                title={album.title}
                artist={album.artist}
                rating={album.rating}
                image={album.image}
              />
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#3E424B85] text-gray-300 py-8 md:py-10 px-4 md:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* CONTACT */}
          <div className="animate-fade-in">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Contact</h2>
            <ul className="space-y-2 text-sm md:text-base">
              <li>Email: songrate@gmail.com</li>
              <li>Instagram: @songrate</li>
              <li>Twitter: @songrate</li>
            </ul>
          </div>

          {/* SUBSCRIBE */}
          <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Subscribe to Us</h2>
            <p className="text-xs md:text-sm mb-4">
              We'll send you the latest releases, news, and offers.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-l-lg bg-[#3E424B] text-gray-200 focus:outline-none text-sm md:text-base"
              />
              <button className="bg-yellow-500 px-4 rounded-r-lg hover:bg-yellow-400 transition-all duration-300">
                <svg width="20" height="20" fill="black" viewBox="0 0 24 24">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-xs md:text-sm mt-8 md:mt-10 animate-fade-in">
          © 2025 SongRate
        </div>
      </footer>

      {/* Tambahkan style CSS untuk animasi */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.9;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}