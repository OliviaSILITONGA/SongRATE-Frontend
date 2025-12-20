import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Home from "../components/Home";
import { getAuthHeaders } from "../utils/authHelper";

export default function NewReleasesPage() {
  const navigate = useNavigate();
  const [releaseType, setReleaseType] = useState("all");
  const [timeFilter, setTimeFilter] = useState("thisWeek");
  const [likedItems, setLikedItems] = useState([]);
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const headers = getAuthHeaders
          ? getAuthHeaders()
          : { "Content-Type": "application/json" };
        // Use relative path when no API base provided (dev proxy)
        const endpoint = `${API_BASE || ""}/api/songs`;
        const res = await fetch(endpoint, { headers });
        if (!res.ok) throw new Error("Failed to fetch songs");
        const data = await res.json();
        // If backend provides uploader info, try to show admin-uploaded songs here.
        const isAdminUpload = (item) => {
          if (!item) return false;
          if (item.uploadedBy && item.uploadedBy.role)
            return item.uploadedBy.role === "admin";
          if (item.uploaderRole) return item.uploaderRole === "admin";
          if (item.isAdminUpload !== undefined) return !!item.isAdminUpload;
          return false;
        };

        let list = Array.isArray(data) ? data : [];
        const adminOnly = list.filter(isAdminUpload);
        // If backend has no uploader info, fall back to showing all releases
        setReleases(adminOnly.length > 0 ? adminOnly : list);
      } catch (err) {
        setError(err.message);
        // Fallback mock data jika API error
        setReleases(generateMockReleases());
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const filteredReleases = () => {
    let list = releases;

    if (releaseType !== "all") {
      list = list.filter((r) => r.type === releaseType.slice(0, -1));
    }

    // Filter berdasarkan waktu (untuk demo)
    switch (timeFilter) {
      case "today":
        return list.slice(0, 4);
      case "thisWeek":
        return list.slice(0, 8);
      case "thisMonth":
        return list;
      default:
        return list;
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      album: "bg-purple-500",
      single: "bg-blue-500",
      ep: "bg-pink-500",
      mixtape: "bg-orange-500",
      compilation: "bg-teal-500",
    };
    return colors[type] || "bg-gray-500";
  };

  const getTypeIcon = (type) => {
    const icons = {
      album: "💿",
      single: "🎵",
      ep: "📀",
      mixtape: "🎤",
      compilation: "🎧",
    };
    return icons[type] || "🎶";
  };

  // Error State
  if (error && releases.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-bl from-[#2E333E] via-[#1C1F26] to-[#171A1F]">
        <Home />
        <div className="pt-[180px] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white overflow-x-hidden">
      <Home />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-32 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent">
              New Releases
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Discover the latest music from your favorite artists and rising
              stars
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-[#2E333E]/50 to-[#3E424B]/30 backdrop-blur-sm border border-gray-700/30">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-yellow-500">🎯</span>
                  Browse Releases
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["all", "albums", "singles", "eps"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setReleaseType(type)}
                      className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                        releaseType === type
                          ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/30"
                          : "bg-[#3E424B] hover:bg-gray-700 text-gray-300"
                      }`}
                    >
                      {type === "all"
                        ? "All Releases"
                        : type === "albums"
                        ? "Albums"
                        : type === "singles"
                        ? "Singles"
                        : "EPs"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 lg:text-right">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <span className="text-gray-400 font-medium flex items-center gap-2">
                    <span className="text-yellow-500">⏰</span>
                    Time Range:
                  </span>
                  <div className="flex bg-[#2E333E] rounded-xl p-1.5 shadow-inner">
                    {["today", "thisWeek", "thisMonth"].map((time) => (
                      <button
                        key={time}
                        onClick={() => setTimeFilter(time)}
                        className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          timeFilter === time
                            ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-md"
                            : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                        }`}
                      >
                        {time === "today"
                          ? "Today"
                          : time === "thisWeek"
                          ? "This Week"
                          : "This Month"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#2E333E]/50 p-4 rounded-xl border border-gray-700/30">
                <p className="text-gray-400 text-sm">Total Releases</p>
                <p className="text-2xl font-bold">{releases.length}</p>
              </div>
              <div className="bg-[#2E333E]/50 p-4 rounded-xl border border-gray-700/30">
                <p className="text-gray-400 text-sm">Showing</p>
                <p className="text-2xl font-bold">
                  {filteredReleases().length}
                </p>
              </div>
              <div className="bg-[#2E333E]/50 p-4 rounded-xl border border-gray-700/30">
                <p className="text-gray-400 text-sm">Your Likes</p>
                <p className="text-2xl font-bold">{likedItems.length}</p>
              </div>
              <div className="bg-[#2E333E]/50 p-4 rounded-xl border border-gray-700/30">
                <p className="text-gray-400 text-sm">Active Filter</p>
                <p className="text-lg font-bold capitalize">
                  {releaseType.replace(/([A-Z])/g, " $1")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Releases Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            {filteredReleases().length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🎵</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  No Releases Found
                </h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Try changing your filters or check back later for new releases
                </p>
                <button
                  onClick={() => {
                    setReleaseType("all");
                    setTimeFilter("thisWeek");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-yellow-500/30 transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredReleases().map((release, index) => (
                  <motion.div
                    key={release.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="group cursor-pointer"
                  >
                    <div className="bg-gradient-to-b from-[#2E333E] to-[#1C1F26] rounded-2xl overflow-hidden border border-gray-700/30 hover:border-yellow-500/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10">
                      {/* Image Container */}
                      <div className="relative h-56 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <img
                          src={release.image}
                          alt={release.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Badge */}
                        <div className="absolute top-4 left-4 z-20">
                          <span
                            className={`px-3 py-1.5 text-xs font-bold rounded-full ${getTypeColor(
                              release.type
                            )} flex items-center gap-1.5`}
                          >
                            {getTypeIcon(release.type)}
                            {(release.type || "").toUpperCase()}
                          </span>
                        </div>

                        {/* Like Button */}
                        <button
                          onClick={() => toggleLike(release.id)}
                          className="absolute top-4 right-4 z-20 p-2.5 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-colors"
                        >
                          <svg
                            className={`w-5 h-5 ${
                              likedItems.includes(release.id)
                                ? "text-red-500 fill-red-500"
                                : "text-white"
                            }`}
                            fill={
                              likedItems.includes(release.id)
                                ? "currentColor"
                                : "none"
                            }
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="mb-3">
                          <h4 className="font-bold text-lg mb-1 truncate group-hover:text-yellow-400 transition-colors">
                            {release.title}
                          </h4>
                          <p className="text-gray-400 text-sm mb-2 truncate">
                            {release.artist}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mb-4 text-xs">
                          <span className="text-gray-500 flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {release.releaseDate || release.releaseYear}
                          </span>
                          <span className="px-3 py-1 bg-gray-700/50 rounded-full text-gray-300">
                            {release.genre}
                          </span>
                        </div>

                        <p className="text-gray-300 text-sm line-clamp-2 mb-5 leading-relaxed">
                          {release.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-700/30">
                          <div className="flex gap-2">
                            <button className="p-2.5 hover:bg-gray-700 rounded-full transition-colors group/share">
                              <svg
                                className="w-5 h-5 text-gray-400 group-hover/share:text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                              </svg>
                            </button>
                            <button className="p-2.5 hover:bg-gray-700 rounded-full transition-colors">
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                            </button>
                          </div>
                          <span className="text-gray-400 text-sm font-medium">
                            {release.tracks
                              ? `${release.tracks} tracks`
                              : release.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Load More Button */}
          {filteredReleases().length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <button
                onClick={() => navigate("/load-more-releases")}
                className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-yellow-500/30 transition-all transform hover:scale-105 active:scale-95"
              >
                Load More Releases
              </button>
              <p className="text-gray-500 text-sm mt-4">
                Showing {filteredReleases().length} of {releases.length} total
                releases
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Helper function for mock data
function generateMockReleases() {
  const mockData = [
    {
      id: 1,
      title: "Eternal Sunshine",
      artist: "Ariana Grande",
      type: "album",
      genre: "Pop",
      releaseDate: "2024-03-08",
      image:
        "https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=Eternal+Sunshine",
      description:
        "The highly anticipated seventh studio album exploring themes of love and self-discovery.",
      tracks: 13,
      duration: "45:22",
    },
    {
      id: 2,
      title: "Golden",
      artist: "HUNTR/X, EJAE, AUDREY NUNA",
      type: "single",
      genre: "Electronic",
      releaseDate: "2024-03-10",
      image: "https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Golden",
      description:
        "Collaborative single featuring multiple artists in the electronic scene.",
      tracks: 1,
      duration: "3:45",
    },
    {
      id: 3,
      title: "The Life of a Showgirl",
      artist: "Taylor Swift",
      type: "album",
      genre: "Pop",
      releaseDate: "2024-03-05",
      image: "https://via.placeholder.com/400x400/EC4899/FFFFFF?text=Showgirl",
      description:
        "A visual album experience showcasing theatrical pop performances.",
      tracks: 16,
      duration: "52:18",
    },
    {
      id: 4,
      title: "Ordinary",
      artist: "Alex Warren",
      type: "ep",
      genre: "Indie",
      releaseDate: "2024-03-12",
      image: "https://via.placeholder.com/400x400/10B981/FFFFFF?text=Ordinary",
      description:
        "A collection of heartfelt indie tracks about everyday life.",
      tracks: 5,
      duration: "18:30",
    },
    {
      id: 5,
      title: "Debi Titar Mas Fotos",
      artist: "Bad Bunny",
      type: "album",
      genre: "Reggaeton",
      releaseDate: "2024-03-01",
      image: "https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=Bad+Bunny",
      description: "Latest reggaeton album with urban latin vibes.",
      tracks: 14,
      duration: "48:15",
    },
    {
      id: 6,
      title: "WHERE IS MY HUSBAND!",
      artist: "RAYE",
      type: "single",
      genre: "R&B",
      releaseDate: "2024-03-15",
      image: "https://via.placeholder.com/400x400/6366F1/FFFFFF?text=RAYE",
      description: "Powerful R&B single with emotional vocals.",
      tracks: 1,
      duration: "3:22",
    },
    {
      id: 7,
      title: "Music",
      artist: "Playboi Carti",
      type: "album",
      genre: "Hip Hop",
      releaseDate: "2024-03-07",
      image: "https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=Music",
      description: "Experimental hip hop album pushing genre boundaries.",
      tracks: 12,
      duration: "38:45",
    },
    {
      id: 8,
      title: "back to friends",
      artist: "sombr",
      type: "ep",
      genre: "Alternative",
      releaseDate: "2024-03-14",
      image: "https://via.placeholder.com/400x400/EC4899/FFFFFF?text=sombr",
      description: "Alternative EP about friendship and nostalgia.",
      tracks: 4,
      duration: "15:20",
    },
  ];

  return mockData;
}
