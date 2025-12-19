import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminStatsCard from "../components/AdminStatsCard";
import AdminSongTable from "../components/AdminSongTable";
import AdminUserTable from "../components/AdminUserTable";
import AdminRecentActivity from "../components/AdminRecentActivity";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(true);
  const [songs, setSongs] = useState([]);
  const [users, setUsers] = useState([]);
  const [showSongModal, setShowSongModal] = useState(false);
  const [editingSong, setEditingSong] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    releaseDate: "",
    duration: "",
    imageUrl: "",
  });

  // Validasi user sudah login
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // Fetch songs
  useEffect(() => {
    fetchSongs();
  }, []);

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchSongs = async () => {
    try {
      // Ganti dengan API endpoint yang sesuai
      const response = await fetch("/api/songs");
      if (response.ok) {
        const data = await response.json();
        setSongs(data);
      } else {
        // Mock data jika API tidak tersedia
        setSongs([
          {
            id: 1,
            title: "Song 1",
            artist: "Artist 1",
            album: "Album 1",
            genre: "Pop",
            duration: "3:45",
          },
          {
            id: 2,
            title: "Song 2",
            artist: "Artist 2",
            album: "Album 2",
            genre: "Rock",
            duration: "4:12",
          },
        ]);
      }
    } catch (error) {
      console.log("Using mock data for songs");
      setSongs([
        {
          id: 1,
          title: "Song 1",
          artist: "Artist 1",
          album: "Album 1",
          genre: "Pop",
          duration: "3:45",
        },
        {
          id: 2,
          title: "Song 2",
          artist: "Artist 2",
          album: "Album 2",
          genre: "Rock",
          duration: "4:12",
        },
      ]);
    }
  };

  const fetchUsers = async () => {
    try {
      // Ganti dengan API endpoint yang sesuai
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        // Mock data jika API tidak tersedia
        setUsers([
          {
            id: 1,
            email: "user1@example.com",
            name: "User 1",
            createdAt: "2025-01-01",
          },
          {
            id: 2,
            email: "user2@example.com",
            name: "User 2",
            createdAt: "2025-01-02",
          },
        ]);
      }
    } catch (error) {
      console.log("Using mock data for users");
      setUsers([
        {
          id: 1,
          email: "user1@example.com",
          name: "User 1",
          createdAt: "2025-01-01",
        },
        {
          id: 2,
          email: "user2@example.com",
          name: "User 2",
          createdAt: "2025-01-02",
        },
      ]);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const openSongModal = (song = null) => {
    if (song) {
      setEditingSong(song);
      setFormData(song);
    } else {
      setEditingSong(null);
      setFormData({
        title: "",
        artist: "",
        album: "",
        genre: "",
        releaseDate: "",
        duration: "",
        imageUrl: "",
      });
    }
    setShowSongModal(true);
  };

  const closeSongModal = () => {
    setShowSongModal(false);
    setEditingSong(null);
    setFormData({
      title: "",
      artist: "",
      album: "",
      genre: "",
      releaseDate: "",
      duration: "",
      imageUrl: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveSong = async () => {
    try {
      const method = editingSong ? "PUT" : "POST";
      const endpoint = editingSong
        ? `/api/songs/${editingSong.id}`
        : "/api/songs";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        if (editingSong) {
          // Update songs list
          setSongs(songs.map((s) => (s.id === editingSong.id ? formData : s)));
        } else {
          // Add new song
          setSongs([...songs, { ...formData, id: Date.now() }]);
        }
        closeSongModal();
      }
    } catch (error) {
      console.error("Error saving song:", error);
      // Mock save - untuk demo tanpa API
      if (editingSong) {
        setSongs(songs.map((s) => (s.id === editingSong.id ? formData : s)));
      } else {
        setSongs([...songs, { ...formData, id: Date.now() }]);
      }
      closeSongModal();
    }
  };

  const handleDeleteSong = async (songId) => {
    try {
      const response = await fetch(`/api/songs/${songId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSongs(songs.filter((s) => s.id !== songId));
      }
    } catch (error) {
      console.error("Error deleting song:", error);
      // Mock delete
      setSongs(songs.filter((s) => s.id !== songId));
    }
  };

  return (
    <div className="flex h-screen bg-[#0F1116]">
      <AdminSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <main
        className={`flex-1 overflow-auto transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Header */}
        <header className="bg-[#1C1F26] border-b border-gray-700 p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-gray-700 rounded-lg"
              >
                ☰
              </button>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">
                Logged in as: <b>{user?.email}</b>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <AdminStatsCard
                  label="Total Songs"
                  value={songs.length}
                  icon="🎵"
                  color="bg-blue-500"
                />
                <AdminStatsCard
                  label="Total Users"
                  value={users.length}
                  icon="👥"
                  color="bg-green-500"
                />
                <AdminStatsCard
                  label="Active Users"
                  value={users.length}
                  icon="✅"
                  color="bg-yellow-500"
                />
                <AdminStatsCard
                  label="Total Ratings"
                  value="524"
                  icon="⭐"
                  color="bg-purple-500"
                />
              </div>

              <AdminRecentActivity songs={songs} users={users} />
            </div>
          )}

          {/* Songs Tab */}
          {activeTab === "songs" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Manajemen Lagu
                </h2>
                <button
                  onClick={() => openSongModal()}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-bold transition-colors"
                >
                  + Tambah Lagu
                </button>
              </div>
              <AdminSongTable
                songs={songs}
                onEdit={openSongModal}
                onDelete={handleDeleteSong}
              />
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Manajemen User</h2>
              <AdminUserTable users={users} />
            </div>
          )}

          {/* Other Tabs */}
          {activeTab === "albums" && (
            <div className="text-center text-gray-400 py-8">
              Fitur Albums sedang dalam pengembangan
            </div>
          )}
          {activeTab === "ratings" && (
            <div className="text-center text-gray-400 py-8">
              Fitur Ratings sedang dalam pengembangan
            </div>
          )}
          {activeTab === "analytics" && (
            <div className="text-center text-gray-400 py-8">
              Fitur Analytics sedang dalam pengembangan
            </div>
          )}
          {activeTab === "settings" && (
            <div className="text-center text-gray-400 py-8">
              Fitur Settings sedang dalam pengembangan
            </div>
          )}
        </div>
      </main>

      {/* Song Modal */}
      {showSongModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1C1F26] rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">
              {editingSong ? "Edit Lagu" : "Tambah Lagu"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Judul Lagu"
                value={formData.title}
                onChange={handleFormChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                name="artist"
                placeholder="Artis"
                value={formData.artist}
                onChange={handleFormChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                name="album"
                placeholder="Album"
                value={formData.album}
                onChange={handleFormChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                name="genre"
                placeholder="Genre"
                value={formData.genre}
                onChange={handleFormChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                name="duration"
                placeholder="Durasi (contoh: 3:45)"
                value={formData.duration}
                onChange={handleFormChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="date"
                name="releaseDate"
                placeholder="Tanggal Rilis"
                value={formData.releaseDate}
                onChange={handleFormChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="URL Gambar"
                value={formData.imageUrl}
                onChange={handleFormChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={closeSongModal}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSaveSong}
                className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-bold transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
