import React, { useState, useEffect } from "react";

export default function ArtistManagement() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArtist, setCurrentArtist] = useState(null);
  const [error, setError] = useState(null);

  // Normalize API base: use Vite env and ensure protocol
  let API_BASE = import.meta.env.VITE_API_URL || "";
  if (API_BASE && !/^https?:\/\//.test(API_BASE))
    API_BASE = `https://${API_BASE}`;
  API_BASE = API_BASE.replace(/\/$/, "");
  const buildApi = (path) => (API_BASE ? `${API_BASE}${path}` : path);

  // ✅ SAMAKAN DENGAN ADMIN SIDEBAR
  const token = localStorage.getItem("adminToken");

  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    bio: "",
    image: "",
    followers: 0,
    verified: false,
  });

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

      if (!res.ok) throw new Error("Failed to fetch artists");

      const data = await res.json();
      setArtists(data.artists || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddArtist = async () => {
    try {
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

      if (!res.ok) throw new Error("Failed to add artist");

      await fetchArtists();
      resetForm();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateArtist = async () => {
    try {
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

      if (!res.ok) throw new Error("Failed to update artist");

      await fetchArtists();
      resetForm();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteArtist = async (id) => {
    if (!window.confirm("Are you sure you want to delete this artist?")) return;

    try {
      const res = await fetch(buildApi(`/api/admin/artists/${id}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete artist");

      await fetchArtists();
    } catch (err) {
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
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsEditing(false);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      genre: "",
      bio: "",
      image: "",
      followers: 0,
      verified: false,
    });
    setCurrentArtist(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#1C1F26] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Artist Management</h1>
            <p className="text-gray-400">Manage all artists in your platform</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg"
          >
            + Add Artist
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-400">
            Loading artists...
          </div>
        ) : artists.length === 0 ? (
          <div className="text-center py-12 bg-[#2E333E] rounded-xl text-gray-400">
            No artists yet.
          </div>
        ) : (
          <div className="bg-[#2E333E] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#3E424B]">
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Genre</th>
                  <th className="px-6 py-4 text-left">Followers</th>
                  <th className="px-6 py-4 text-left">Verified</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {artists.map((artist) => (
                  <tr key={artist.id} className="border-b border-gray-700">
                    <td className="px-6 py-4 font-semibold">{artist.name}</td>
                    <td className="px-6 py-4 text-gray-400">
                      {artist.genre || "-"}
                    </td>
                    <td className="px-6 py-4">{artist.followers || 0}</td>
                    <td className="px-6 py-4">{artist.verified ? "✓" : "-"}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleOpenEdit(artist)}
                        className="px-3 py-1 bg-blue-600 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteArtist(artist.id)}
                        className="px-3 py-1 bg-red-600 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
