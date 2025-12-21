import React, { useState, useEffect } from "react";

export default function SongManagement() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  let API_BASE = import.meta.env.VITE_API_URL || "";
  if (API_BASE && !/^https?:\/\//.test(API_BASE))
    API_BASE = `https://${API_BASE}`;
  API_BASE = API_BASE.replace(/\/$/, "");

  const buildApi = (path) => (API_BASE ? `${API_BASE}${path}` : path);
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    type: "single", // album | single | ep
    releaseDate: "",
    releaseYear: new Date().getFullYear(),
    tracks: 1,
    duration: "",
    image: "",
    description: "",
    highlight: false,
    status: "confirmed",
  });

  // Fetch all songs
  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await fetch(buildApi("/api/songs"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch songs");
      }
      const data = await res.json();
      setSongs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch songs error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "tracks" || name === "releaseYear"
            ? parseInt(value)
            : value,
    }));
  };

  const handleAddSong = async () => {
    try {
      setError(null);
      setSuccess(null);
      if (!formData.title.trim() || !formData.artist.trim()) {
        setError("Title and Artist are required");
        return;
      }

      const res = await fetch(buildApi("/api/admin/songs"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      // Parse response untuk mendapatkan detail error
      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMessage = responseData.message || responseData.error || `Failed to add song (${res.status})`;
        throw new Error(errorMessage);
      }

      setSuccess("Song added successfully!");
      await fetchSongs();
      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error("Add song error:", err);
      setError(err.message);
    }
  };

  const handleUpdateSong = async () => {
    try {
      setError(null);
      setSuccess(null);
      if (!formData.title.trim() || !formData.artist.trim()) {
        setError("Title and Artist are required");
        return;
      }

      const res = await fetch(buildApi(`/api/admin/songs/${currentSong.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      // Parse response untuk mendapatkan detail error
      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMessage = responseData.message || responseData.error || `Failed to update song (${res.status})`;
        throw new Error(errorMessage);
      }

      setSuccess("Song updated successfully!");
      await fetchSongs();
      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error("Update song error:", err);
      setError(err.message);
    }
  };

  const handleDeleteSong = async (id) => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;
    try {
      setError(null);
      const res = await fetch(buildApi(`/api/admin/songs/${id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMessage = responseData.message || responseData.error || `Failed to delete song (${res.status})`;
        throw new Error(errorMessage);
      }

      setSuccess("Song deleted successfully!");
      await fetchSongs();
    } catch (err) {
      console.error("Delete song error:", err);
      setError(err.message);
    }
  };

  const handleOpenEdit = (song) => {
    setCurrentSong(song);
    setFormData(song);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsEditing(false);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
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
    setCurrentSong(null);
  };

  return (
    <div className="min-h-screen bg-[#1C1F26] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Song Management</h1>
            <p className="text-gray-400">Manage all songs in your platform</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition"
          >
            + Add Song
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
            {success}
            <button
              onClick={() => setSuccess(null)}
              className="ml-4 underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-400">Loading songs...</div>
          </div>
        ) : songs.length === 0 ? (
          <div className="text-center py-12 bg-[#2E333E] rounded-xl">
            <div className="text-gray-400">
              No songs yet. Add your first song!
            </div>
          </div>
        ) : (
          /* Songs Table */
          <div className="bg-[#2E333E] rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-[#3E424B]">
                    <th className="text-left py-4 px-6 font-semibold">Title</th>
                    <th className="text-left py-4 px-6 font-semibold">
                      Artist
                    </th>
                    <th className="text-left py-4 px-6 font-semibold">Type</th>
                    <th className="text-left py-4 px-6 font-semibold">Genre</th>
                    <th className="text-left py-4 px-6 font-semibold">
                      Release Date
                    </th>
                    <th className="text-left py-4 px-6 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {songs.map((song) => (
                    <tr
                      key={song.id}
                      className="border-b border-gray-800 hover:bg-[#3E424B] transition"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          {song.image && (
                            <img
                              src={song.image}
                              alt={song.title}
                              className="w-10 h-10 rounded object-cover"
                            />
                          )}
                          <div>
                            <div className="font-semibold">{song.title}</div>
                            {song.highlight && (
                              <span className="text-xs text-yellow-400">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-400">{song.artist}</td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-semibold">
                          {song.type?.toUpperCase() || "N/A"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-400">
                        {song.genre || "N/A"}
                      </td>
                      <td className="py-4 px-6 text-gray-400">
                        {song.releaseDate || song.releaseYear}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleOpenEdit(song)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSong(song.id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2E333E] rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                {isEditing ? "Edit Song" : "Add New Song"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Song title"
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
                    value={formData.artist}
                    onChange={handleInputChange}
                    placeholder="Artist name"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="single">Single</option>
                    <option value="album">Album</option>
                    <option value="ep">EP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Genre
                  </label>
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    placeholder="e.g., Pop, Rock"
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
                    value={formData.releaseDate}
                    onChange={handleInputChange}
                    placeholder="e.g., April 19, 2024"
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
                    value={formData.releaseYear}
                    onChange={handleInputChange}
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
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 3:32 or 65:22"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tracks
                  </label>
                  <input
                    type="number"
                    name="tracks"
                    value={formData.tracks}
                    onChange={handleInputChange}
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
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Song description..."
                    rows="3"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="rumored">Rumored</option>
                    <option value="highlyAnticipated">
                      Highly Anticipated
                    </option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <input
                    type="checkbox"
                    name="highlight"
                    checked={formData.highlight}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded"
                  />
                  <label className="ml-2 text-sm font-medium">
                    Featured Release
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditing ? handleUpdateSong : handleAddSong}
                  className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition font-semibold"
                >
                  {isEditing ? "Update" : "Add"} Song
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
