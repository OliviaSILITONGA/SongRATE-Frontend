import Home from "../components/Home";
import { useState, useEffect } from "react";

export default function LoadMoreReleasesPage() {
  const [releaseType, setReleaseType] = useState("all");
  const [timeFilter, setTimeFilter] = useState("thisWeek");
  const [likedItems, setLikedItems] = useState([]);
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSong, setEditingSong] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Normalize API base: use Vite env and ensure protocol
  let API_BASE = import.meta.env.VITE_API_URL || "";
  if (API_BASE && !/^https?:\/\//.test(API_BASE))
    API_BASE = `https://${API_BASE}`;
  API_BASE = API_BASE.replace(/\/$/, "");
  const buildApi = (path) => (API_BASE ? `${API_BASE}${path}` : path);
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const [editFormData, setEditFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    type: "single",
    releaseDate: "",
    releaseYear: new Date().getFullYear(),
    tracks: 1,
    duration: "",
    image: "",
    description: "",
    highlight: false,
    status: "confirmed",
  });

  useEffect(() => {
    // Check if user is admin
    setIsAdmin(userRole === "admin");
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(buildApi("/api/songs"));
      if (!res.ok) throw new Error("Failed to fetch songs");
      const data = await res.json();
      setReleases(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = (id) => {
    if (likedItems.includes(id)) {
      setLikedItems(likedItems.filter((itemId) => itemId !== id));
    } else {
      setLikedItems([...likedItems, id]);
    }
  };

  const filteredReleases = () => {
    let list = releases || [];
    if (releaseType === "albums") list = list.filter((r) => r.type === "album");
    else if (releaseType === "singles")
      list = list.filter((r) => r.type === "single");
    else if (releaseType === "eps") list = list.filter((r) => r.type === "ep");

    if (timeFilter === "today") return list.slice(0, 3);
    if (timeFilter === "thisMonth") return [...list, ...list.slice(0, 2)];
    return list;
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "album":
        return "bg-purple-500";
      case "single":
        return "bg-blue-500";
      case "ep":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleEditSong = (song) => {
    setEditingSong(song);
    setEditFormData(song);
    setShowEditModal(true);
  };

  const handleUpdateSong = async () => {
    try {
      if (!editFormData.title.trim() || !editFormData.artist.trim()) {
        setError("Title and Artist are required");
        return;
      }

      const res = await fetch(`${API_BASE}/api/admin/songs/${editingSong.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFormData),
      });

      if (!res.ok) throw new Error("Failed to update song");
      await fetchSongs();
      setShowEditModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteSong = async (id) => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/songs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete song");
      await fetchSongs();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "tracks" || name === "releaseYear"
          ? parseInt(value)
          : value,
    }));
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-bl pt-[180px] from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white flex items-center justify-center">
        <div className="text-gray-400">Loading songs...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-bl pt-[180px] from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-bl pt-[180px] from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white">
      <Home />

      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-5xl text-center font-bold mb-2">All Releases</h2>
        <p className="text-center text-gray-400 mb-8">
          Discover all music from your favorite artists
        </p>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold mb-3">Browse Releases</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-4 py-2 rounded-lg transition ${
                    releaseType === "all"
                      ? "bg-yellow-500 text-black font-semibold"
                      : "bg-[#3E424B] hover:bg-[#4A4F5A]"
                  }`}
                  onClick={() => setReleaseType("all")}
                >
                  All Releases
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition ${
                    releaseType === "albums"
                      ? "bg-yellow-500 text-black font-semibold"
                      : "bg-[#3E424B] hover:bg-[#4A4F5A]"
                  }`}
                  onClick={() => setReleaseType("albums")}
                >
                  Albums
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition ${
                    releaseType === "singles"
                      ? "bg-yellow-500 text-black font-semibold"
                      : "bg-[#3E424B] hover:bg-[#4A4F5A]"
                  }`}
                  onClick={() => setReleaseType("singles")}
                >
                  Singles
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition ${
                    releaseType === "eps"
                      ? "bg-yellow-500 text-black font-semibold"
                      : "bg-[#3E424B] hover:bg-[#4A4F5A]"
                  }`}
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
                    className={`px-3 py-1 rounded-md text-sm transition ${
                      timeFilter === "today"
                        ? "bg-yellow-500 text-black font-semibold"
                        : "hover:bg-[#4A4F5A]"
                    }`}
                    onClick={() => setTimeFilter("today")}
                  >
                    Today
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm transition ${
                      timeFilter === "thisWeek"
                        ? "bg-yellow-500 text-black font-semibold"
                        : "hover:bg-[#4A4F5A]"
                    }`}
                    onClick={() => setTimeFilter("thisWeek")}
                  >
                    This Week
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm transition ${
                      timeFilter === "thisMonth"
                        ? "bg-yellow-500 text-black font-semibold"
                        : "hover:bg-[#4A4F5A]"
                    }`}
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
          {filteredReleases().length === 0 ? (
            <div className="text-center py-12 bg-[#2E333E] rounded-xl">
              <div className="text-gray-400">
                No releases found for the selected filters
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredReleases().map((release) => (
                <div
                  key={release.id}
                  className="bg-gradient-to-b from-[#3E424B] to-[#2E333E] rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 group relative"
                >
                  {/* Admin Edit/Delete Buttons */}
                  {isAdmin && (
                    <div className="absolute top-2 right-2 z-10 flex space-x-2">
                      <button
                        onClick={() => handleEditSong(release)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs font-semibold transition"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteSong(release.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs font-semibold transition"
                      >
                        🗑️
                      </button>
                    </div>
                  )}

                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={release.image}
                      alt={release.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2 py-1 text-xs font-bold rounded ${getTypeColor(
                          release.type
                        )}`}
                      >
                        {(release.type || "").toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                      <button className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center mx-auto mb-4 transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                        <svg
                          className="w-6 h-6 text-black"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-1 truncate">
                      {release.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-2">
                      {release.artist}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-500 text-xs">
                        {release.releaseDate || release.releaseYear}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {release.genre}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                      {release.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleLike(release.id)}
                          className={`p-2 rounded-full transition transform active:scale-95 ${
                            likedItems.includes(release.id)
                              ? "text-red-500"
                              : "text-gray-400 hover:text-white hover:bg-gray-700"
                          }`}
                        >
                          <svg
                            className="w-4 h-4"
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

                        <button className="p-2 hover:bg-gray-700 rounded-full transition text-white">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                          </svg>
                        </button>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {release.tracks
                          ? `${release.tracks} tracks`
                          : release.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingSong && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2E333E] rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Song</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Artist *
                </label>
                <input
                  type="text"
                  name="artist"
                  value={editFormData.artist}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  name="type"
                  value={editFormData.type}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="single">Single</option>
                  <option value="album">Album</option>
                  <option value="ep">EP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Genre</label>
                <input
                  type="text"
                  name="genre"
                  value={editFormData.genre}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Release Date
                </label>
                <input
                  type="text"
                  name="releaseDate"
                  value={editFormData.releaseDate}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Release Year
                </label>
                <input
                  type="number"
                  name="releaseYear"
                  value={editFormData.releaseYear}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={editFormData.duration}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tracks</label>
                <input
                  type="number"
                  name="tracks"
                  value={editFormData.tracks}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={editFormData.image}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditFormChange}
                  rows="3"
                  className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="rumored">Rumored</option>
                  <option value="highlyAnticipated">Highly Anticipated</option>
                </select>
              </div>

              <div className="flex items-center pt-6">
                <input
                  type="checkbox"
                  name="highlight"
                  checked={editFormData.highlight}
                  onChange={handleEditFormChange}
                  className="w-4 h-4 rounded"
                />
                <label className="ml-2 text-sm font-medium">
                  Featured Release
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSong}
                className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition font-semibold"
              >
                Update Song
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
