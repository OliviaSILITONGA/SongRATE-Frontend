import React, { useState, useEffect } from "react";

export default function ArtistManagement() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArtist, setCurrentArtist] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Normalize API base: use Vite env and ensure protocol
  let API_BASE = import.meta.env.VITE_API_URL || "";
  if (API_BASE && !/^https?:\/\//.test(API_BASE))
    API_BASE = `https://${API_BASE}`;
  API_BASE = API_BASE.replace(/\/$/, "");
  const buildApi = (path) => (API_BASE ? `${API_BASE}${path}` : path);

  // ✅ KONSISTEN DENGAN KOMPONEN LAIN
  const token = localStorage.getItem("token");

  const emptyForm = {
    name: "",
    genre: "",
    bio: "",
    image: "",
    followers: 0,
    verified: false,
  };

  const [formData, setFormData] = useState(emptyForm);

  // Fetch artists
  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(buildApi("/api/admin/artists"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch artists");
      }

      const data = await res.json();
      setArtists(data.artists || []);
    } catch (err) {
      console.error("Fetch artists error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? checked
        : name === "followers"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleAddArtist = async () => {
    try {
      setError(null);
      setSuccess(null);

      if (!formData.name.trim()) {
        setError("Artist name is required");
        return;
      }

      const res = await fetch(buildApi("/api/admin/artists"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMessage = responseData.message || responseData.error || `Failed to add artist (${res.status})`;
        throw new Error(errorMessage);
      }

      setSuccess("Artist added successfully!");
      await fetchArtists();
      closeModal();
    } catch (err) {
      console.error("Add artist error:", err);
      setError(err.message);
    }
  };

  const handleUpdateArtist = async () => {
    try {
      setError(null);
      setSuccess(null);

      if (!formData.name.trim()) {
        setError("Artist name is required");
        return;
      }

      const res = await fetch(
        buildApi(`/api/admin/artists/${currentArtist.id}`),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMessage = responseData.message || responseData.error || `Failed to update artist (${res.status})`;
        throw new Error(errorMessage);
      }

      setSuccess("Artist updated successfully!");
      await fetchArtists();
      closeModal();
    } catch (err) {
      console.error("Update artist error:", err);
      setError(err.message);
    }
  };

  const handleDeleteArtist = async (id) => {
    if (!window.confirm("Are you sure you want to delete this artist?")) return;

    try {
      setError(null);

      const res = await fetch(buildApi(`/api/admin/artists/${id}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMessage = responseData.message || responseData.error || `Failed to delete artist (${res.status})`;
        throw new Error(errorMessage);
      }

      setSuccess("Artist deleted successfully!");
      await fetchArtists();
    } catch (err) {
      console.error("Delete artist error:", err);
      setError(err.message);
    }
  };

  const handleOpenEdit = (artist) => {
    setCurrentArtist(artist);
    setFormData({
      name: artist.name || "",
      genre: artist.genre || "",
      bio: artist.bio || "",
      image: artist.image || "",
      followers: artist.followers || 0,
      verified: artist.verified || false,
    });
    setIsEditing(true);
    setShowModal(true);
    setError(null);
    setSuccess(null);
  };

  const handleOpenAdd = () => {
    setFormData(emptyForm);
    setCurrentArtist(null);
    setIsEditing(false);
    setShowModal(true);
    setError(null);
    setSuccess(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentArtist(null);
    setFormData(emptyForm);
  };

  return (
    <div className="min-h-screen bg-[#1C1F26] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Artist Management</h1>
            <p className="text-gray-400">Manage all artists in your platform</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition"
          >
            + Add Artist
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

        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">
            Loading artists...
          </div>
        ) : artists.length === 0 ? (
          <div className="text-center py-12 bg-[#2E333E] rounded-xl text-gray-400">
            No artists yet. Add your first artist!
          </div>
        ) : (
          <div className="bg-[#2E333E] rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#3E424B]">
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Genre</th>
                    <th className="px-6 py-4 text-left font-semibold">Followers</th>
                    <th className="px-6 py-4 text-left font-semibold">Verified</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {artists.map((artist) => (
                    <tr key={artist.id} className="border-b border-gray-700 hover:bg-[#3E424B] transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {artist.image && (
                            <img
                              src={artist.image}
                              alt={artist.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          )}
                          <span className="font-semibold">{artist.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {artist.genre || "-"}
                      </td>
                      <td className="px-6 py-4">{artist.followers || 0}</td>
                      <td className="px-6 py-4">
                        {artist.verified ? (
                          <span className="text-green-400">✓ Verified</span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleOpenEdit(artist)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteArtist(artist.id)}
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

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2E333E] rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                {isEditing ? "Edit Artist" : "Add New Artist"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Artist name"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
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
                    placeholder="e.g., Pop, Rock, Hip-Hop"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Followers
                  </label>
                  <input
                    type="number"
                    name="followers"
                    value={formData.followers}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <input
                    type="checkbox"
                    name="verified"
                    checked={formData.verified}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded"
                  />
                  <label className="ml-2 text-sm font-medium">
                    Verified Artist
                  </label>
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
                    placeholder="https://example.com/artist-image.jpg"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Artist biography..."
                    rows="3"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-8">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditing ? handleUpdateArtist : handleAddArtist}
                  className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition font-semibold"
                >
                  {isEditing ? "Update" : "Add"} Artist
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
