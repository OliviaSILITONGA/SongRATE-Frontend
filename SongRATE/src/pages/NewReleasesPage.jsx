import Menu from "../components/Menu";
import { useState } from "react";

export default function NewReleasesPage() {
  const [releaseType, setReleaseType] = useState("all");
  const [timeFilter, setTimeFilter] = useState("thisWeek");

  const newReleasesData = {
    featured: [
      {
        id: 1,
        title: "The Tortured Poets Department",
        artist: "Taylor Swift",
        type: "album",
        releaseDate: "April 19, 2024",
        genre: "Pop",
        tracks: 16,
        duration: "65:22",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Taylor Swift's highly anticipated 11th studio album exploring themes of heartbreak, poetry, and self-discovery.",
        highlight: true
      }
    ],
    albums: [
      {
        id: 2,
        title: "Hit Me Hard and Soft",
        artist: "Billie Eilish",
        type: "album",
        releaseDate: "May 17, 2024",
        genre: "Alternative Pop",
        tracks: 10,
        duration: "42:15",
        image: "https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Billie Eilish's third studio album featuring a blend of soft ballads and hard-hitting tracks."
      },
      {
        id: 3,
        title: "Radical Optimism",
        artist: "Dua Lipa",
        type: "album",
        releaseDate: "May 3, 2024",
        genre: "Dance-pop",
        tracks: 11,
        duration: "48:30",
        image: "https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Dua Lipa's psychedelic-inspired third album exploring themes of joy and resilience."
      },
      {
        id: 4,
        title: "The Great Western Road",
        artist: "Noah Kahan",
        type: "album",
        releaseDate: "April 26, 2024",
        genre: "Folk-pop",
        tracks: 14,
        duration: "52:10",
        image: "https://images.unsplash.com/photo-1520707136151-2f494b6c6d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "A soulful journey through Americana and folk traditions."
      }
    ],
    singles: [
      {
        id: 5,
        title: "Espresso",
        artist: "Sabrina Carpenter",
        type: "single",
        releaseDate: "April 12, 2024",
        genre: "Pop",
        duration: "3:02",
        image: "https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-4.0.3&auto=format&fit=crop&w-600&q=80",
        description: "Upbeat summer pop anthem about morning coffee and romance."
      },
      {
        id: 6,
        title: "A Bar Song (Tipsy)",
        artist: "Shaboozey",
        type: "single",
        releaseDate: "April 5, 2024",
        genre: "Country Rap",
        duration: "3:48",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Country-meets-hip-hop track about weekend celebrations."
      },
      {
        id: 7,
        title: "I Can Do It With A Broken Heart",
        artist: "Taylor Swift",
        type: "single",
        releaseDate: "April 19, 2024",
        genre: "Synth-pop",
        duration: "3:32",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Upbeat synth-pop track about performing through pain."
      },
      {
        id: 8,
        title: "Million Dollar Baby",
        artist: "Tommy Richman",
        type: "single",
        releaseDate: "April 26, 2024",
        genre: "R&B",
        duration: "2:55",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Smooth R&B track about luxury and success."
      }
    ],
    eps: [
      {
        id: 9,
        title: "Digital Witness",
        artist: "St. Vincent",
        type: "ep",
        releaseDate: "May 1, 2024",
        genre: "Art Rock",
        tracks: 4,
        duration: "15:20",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Experimental art rock EP exploring digital consciousness."
      },
      {
        id: 10,
        title: "Midnight Sessions",
        artist: "FKJ",
        type: "ep",
        releaseDate: "April 28, 2024",
        genre: "Electronic",
        tracks: 5,
        duration: "22:45",
        image: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Late-night electronic jazz fusion EP."
      }
    ]
  };

  const upcomingReleases = [
    {
      id: 11,
      title: "Untitled Album",
      artist: "Rihanna",
      type: "album",
      releaseDate: "June 2024",
      genre: "Pop/R&B",
      status: "highlyAnticipated"
    },
    {
      id: 12,
      title: "Untitled Project",
      artist: "Frank Ocean",
      type: "album",
      releaseDate: "TBA 2024",
      genre: "Alternative R&B",
      status: "rumored"
    },
    {
      id: 13,
      title: "New Single",
      artist: "The Weeknd",
      type: "single",
      releaseDate: "May 24, 2024",
      genre: "R&B",
      status: "confirmed"
    }
  ];

  const filteredReleases = () => {
    let releases = [];
    
    if (releaseType === "all") {
      releases = [
        ...newReleasesData.featured,
        ...newReleasesData.albums,
        ...newReleasesData.singles,
        ...newReleasesData.eps
      ];
    } else if (releaseType === "albums") {
      releases = newReleasesData.albums;
    } else if (releaseType === "singles") {
      releases = newReleasesData.singles;
    } else if (releaseType === "eps") {
      releases = newReleasesData.eps;
    }

    // Apply time filter
    if (timeFilter === "today") {
      // For demo, filter to show some items
      return releases.slice(0, 3);
    } else if (timeFilter === "thisWeek") {
      return releases;
    } else if (timeFilter === "thisMonth") {
      return [...releases, ...newReleasesData.albums.slice(0, 2)];
    }

    return releases;
  };

  const getTypeColor = (type) => {
    switch(type) {
      case "album": return "bg-purple-500";
      case "single": return "bg-blue-500";
      case "ep": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "highlyAnticipated":
        return <span className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded">Highly Anticipated</span>;
      case "rumored":
        return <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded">Rumored</span>;
      case "confirmed":
        return <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">Confirmed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl pt-[180px] from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white">
      <Menu />

      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-5xl text-center font-bold mb-2">New Releases</h2>
        <p className="text-center text-gray-400 mb-8">Discover the latest music from your favorite artists</p>

        {/* Featured Release */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#3E424B] to-[#2E333E]">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 z-10"></div>
            <div className="relative z-20 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0 md:mr-8">
                  <div className="relative">
                    <img 
                      src={newReleasesData.featured[0].image} 
                      alt={newReleasesData.featured[0].title}
                      className="rounded-xl shadow-2xl w-full max-w-md mx-auto"
                    />
                    <div className="absolute -top-2 -right-2">
                      <span className="px-3 py-1 bg-yellow-500 text-black text-sm font-bold rounded-full">
                        FEATURED
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <div className="flex items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(newReleasesData.featured[0].type)}`}>
                      {newReleasesData.featured[0].type.toUpperCase()}
                    </span>
                    <span className="ml-4 text-gray-400">{newReleasesData.featured[0].releaseDate}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3">{newReleasesData.featured[0].title}</h3>
                  <p className="text-xl text-gray-300 mb-4">by {newReleasesData.featured[0].artist}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">{newReleasesData.featured[0].genre}</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">{newReleasesData.featured[0].tracks} tracks</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">{newReleasesData.featured[0].duration}</span>
                  </div>
                  <p className="text-gray-300 mb-6">{newReleasesData.featured[0].description}</p>
                  <div className="flex space-x-4">
                    <button className="flex-1 bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-600 transition duration-300 flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Listen Now
                    </button>
                    <button className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                    </button>
                    <button className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold mb-3">Browse Releases</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-4 py-2 rounded-lg transition ${releaseType === "all" ? "bg-yellow-500 text-black font-semibold" : "bg-[#3E424B] hover:bg-[#4A4F5A]"}`}
                  onClick={() => setReleaseType("all")}
                >
                  All Releases
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition ${releaseType === "albums" ? "bg-yellow-500 text-black font-semibold" : "bg-[#3E424B] hover:bg-[#4A4F5A]"}`}
                  onClick={() => setReleaseType("albums")}
                >
                  Albums
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition ${releaseType === "singles" ? "bg-yellow-500 text-black font-semibold" : "bg-[#3E424B] hover:bg-[#4A4F5A]"}`}
                  onClick={() => setReleaseType("singles")}
                >
                  Singles
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition ${releaseType === "eps" ? "bg-yellow-500 text-black font-semibold" : "bg-[#3E424B] hover:bg-[#4A4F5A]"}`}
                  onClick={() => setReleaseType("eps")}
                >
                  EPs
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Time:</span>
                <div className="flex bg-[#3E424B] rounded-lg p-1">
                  <button
                    className={`px-3 py-1 rounded-md text-sm transition ${timeFilter === "today" ? "bg-yellow-500 text-black font-semibold" : "hover:bg-[#4A4F5A]"}`}
                    onClick={() => setTimeFilter("today")}
                  >
                    Today
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm transition ${timeFilter === "thisWeek" ? "bg-yellow-500 text-black font-semibold" : "hover:bg-[#4A4F5A]"}`}
                    onClick={() => setTimeFilter("thisWeek")}
                  >
                    This Week
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm transition ${timeFilter === "thisMonth" ? "bg-yellow-500 text-black font-semibold" : "hover:bg-[#4A4F5A]"}`}
                    onClick={() => setTimeFilter("thisMonth")}
                  >
                    This Month
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Releases Grid */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredReleases().map((release) => (
              <div 
                key={release.id} 
                className="bg-gradient-to-b from-[#3E424B] to-[#2E333E] rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={release.image} 
                    alt={release.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-bold rounded ${getTypeColor(release.type)}`}>
                      {release.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                    <button className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center mx-auto mb-4 transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-1 truncate">{release.title}</h4>
                  <p className="text-gray-400 text-sm mb-2">{release.artist}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-500 text-xs">{release.releaseDate}</span>
                    <span className="text-gray-500 text-xs">{release.genre}</span>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2 mb-4">{release.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-gray-700 rounded-full transition">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-gray-700 rounded-full transition">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {release.tracks ? `${release.tracks} tracks` : release.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Releases */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Upcoming Releases
          </h3>
          <div className="bg-gradient-to-r from-[#3E424B] to-[#2E333E] rounded-xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Release</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Artist</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Release Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingReleases.map((release) => (
                    <tr key={release.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                      <td className="py-3 px-4">
                        <div className="font-semibold">{release.title}</div>
                        <div className="text-gray-400 text-sm">{release.genre}</div>
                      </td>
                      <td className="py-3 px-4 font-medium">{release.artist}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded ${getTypeColor(release.type)}`}>
                          {release.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4">{release.releaseDate}</td>
                      <td className="py-3 px-4">
                        {getStatusBadge(release.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-[#3E424B] to-[#2A2D35] rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Never Miss a Release</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get notified when your favorite artists drop new music. We'll send you personalized release alerts based on your listening history.
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-l-lg bg-[#2E333E] text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="bg-yellow-500 text-black font-semibold px-6 py-3 rounded-r-lg hover:bg-yellow-600 transition duration-300">
                Get Notified
              </button>
            </div>
          </div>
        </div>
      </div>

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
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144六.784.144-8.883 0C5.279 16.736 5.018 15.022 5 12c.018-3.024.279-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.721 7.264 18.982 8.978 19 12c-.018 3.024-.279 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/>
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