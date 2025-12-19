import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isOpen, setIsOpen] = useState(false); // Default false untuk mobile
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
  const [loading, setLoading] = useState({
    songs: false,
    users: false
  });

  // Set sidebar state berdasarkan screen size
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
    setLoading(prev => ({ ...prev, songs: true }));
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
            title: "Golden",
            artist: "HUNTR/X, EJAE",
            album: "HUNTRIX",
            genre: "Pop",
            duration: "3:45",
            ratings: 1078,
            imageUrl: "https://via.placeholder.com/150"
          },
          {
            id: 2,
            title: "The Fate of Ophelia",
            artist: "Taylor Swift",
            album: "The Life of a Showgirl",
            genre: "Pop",
            duration: "4:12",
            ratings: 1158,
            imageUrl: "https://via.placeholder.com/150"
          },
          {
            id: 3,
            title: "Ordinary",
            artist: "Alex Warren",
            album: "MOON",
            genre: "Indie",
            duration: "3:30",
            ratings: 997,
            imageUrl: "https://via.placeholder.com/150"
          },
        ]);
      }
    } catch (error) {
      console.log("Using mock data for songs");
      setSongs([
        {
          id: 1,
          title: "Golden",
          artist: "HUNTR/X, EJAE",
          album: "HUNTRIX",
          genre: "Pop",
          duration: "3:45",
          ratings: 1078,
          imageUrl: "https://via.placeholder.com/150"
        },
        {
          id: 2,
          title: "The Fate of Ophelia",
          artist: "Taylor Swift",
          album: "The Life of a Showgirl",
          genre: "Pop",
          duration: "4:12",
          ratings: 1158,
          imageUrl: "https://via.placeholder.com/150"
        },
        {
          id: 3,
          title: "Ordinary",
          artist: "Alex Warren",
          album: "MOON",
          genre: "Indie",
          duration: "3:30",
          ratings: 997,
          imageUrl: "https://via.placeholder.com/150"
        },
      ]);
    } finally {
      setLoading(prev => ({ ...prev, songs: false }));
    }
  };

  const fetchUsers = async () => {
    setLoading(prev => ({ ...prev, users: true }));
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
            name: "John Doe",
            createdAt: "2025-01-01",
            status: "active",
            ratingsCount: 45
          },
          {
            id: 2,
            email: "user2@example.com",
            name: "Alice Smith",
            createdAt: "2025-01-02",
            status: "active",
            ratingsCount: 89
          },
          {
            id: 3,
            email: "user3@example.com",
            name: "Bob Wilson",
            createdAt: "2025-01-03",
            status: "inactive",
            ratingsCount: 12
          },
        ]);
      }
    } catch (error) {
      console.log("Using mock data for users");
      setUsers([
        {
          id: 1,
          email: "user1@example.com",
          name: "John Doe",
          createdAt: "2025-01-01",
          status: "active",
          ratingsCount: 45
        },
        {
          id: 2,
          email: "user2@example.com",
          name: "Alice Smith",
          createdAt: "2025-01-02",
          status: "active",
          ratingsCount: 89
        },
        {
          id: 3,
          email: "user3@example.com",
          name: "Bob Wilson",
          createdAt: "2025-01-03",
            status: "inactive",
          ratingsCount: 12
        },
      ]);
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const openSongModal = (song = null) => {
    if (song) {
      setEditingSong(song);
      setFormData({
        title: song.title || "",
        artist: song.artist || "",
        album: song.album || "",
        genre: song.genre || "",
        releaseDate: song.releaseDate || "",
        duration: song.duration || "",
        imageUrl: song.imageUrl || "",
      });
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
          setSongs(songs.map((s) => (s.id === editingSong.id ? { ...s, ...formData } : s)));
        } else {
          // Add new song
          setSongs([...songs, { ...formData, id: Date.now(), ratings: 0 }]);
        }
        closeSongModal();
      }
    } catch (error) {
      console.error("Error saving song:", error);
      // Mock save - untuk demo tanpa API
      if (editingSong) {
        setSongs(songs.map((s) => (s.id === editingSong.id ? { ...s, ...formData } : s)));
      } else {
        setSongs([...songs, { ...formData, id: Date.now(), ratings: 0 }]);
      }
      closeSongModal();
    }
  };

  const handleDeleteSong = async (songId) => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;
    
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
    <div className="flex min-h-screen bg-gradient-to-bl from-[#2E333E] via-[#1C1F26] to-[#171A1F]">
      <AdminSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <main
        className={`flex-1 min-h-screen overflow-x-hidden transition-all duration-300 ${
          isOpen ? "lg:ml-64" : "ml-0"
        }`}
      >
        {/* Header */}
        <header className="bg-[#1C1F26] border-b border-gray-700/50 p-4 sticky top-0 z-30 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white truncate">
                {activeTab === "dashboard" && "Admin Dashboard"}
                {activeTab === "songs" && "Song Management"}
                {activeTab === "users" && "User Management"}
                {activeTab === "albums" && "Album Management"}
                {activeTab === "ratings" && "Rating Management"}
                {activeTab === "analytics" && "Analytics"}
                {activeTab === "settings" && "Settings"}
              </h1>
            </div>
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs text-gray-400">Logged in as</span>
                <span className="text-sm font-medium text-white truncate max-w-[150px]">
                  {user?.email || "Admin"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 md:px-4 md:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm md:text-base flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 md:p-6 lg:p-8">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Stats Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <AdminStatsCard
                  label="Total Songs"
                  value={songs.length}
                  icon="🎵"
                  color="bg-blue-500"
                  loading={loading.songs}
                />
                <AdminStatsCard
                  label="Total Users"
                  value={users.length}
                  icon="👥"
                  color="bg-green-500"
                  loading={loading.users}
                />
                <AdminStatsCard
                  label="Active Users"
                  value={users.filter(u => u.status === 'active').length}
                  icon="✅"
                  color="bg-yellow-500"
                />
                <AdminStatsCard
                  label="Total Ratings"
                  value={songs.reduce((sum, song) => sum + (song.ratings || 0), 0)}
                  icon="⭐"
                  color="bg-purple-500"
                />
              </div>

              {/* Recent Activity */}
              <div className="bg-[#1C1F26]/50 rounded-xl p-4 md:p-6 border border-gray-700/30">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h2 className="text-lg md:text-xl font-bold text-white">Recent Activity</h2>
                  <button className="text-sm text-yellow-500 hover:text-yellow-400">
                    View All →
                  </button>
                </div>
                <AdminRecentActivity songs={songs} users={users} />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#1C1F26]/50 rounded-xl p-4 md:p-6 border border-gray-700/30">
                  <h3 className="text-lg font-bold text-white mb-4">Top Rated Songs</h3>
                  <div className="space-y-3">
                    {songs.slice(0, 3).map((song, index) => (
                      <div key={song.id} className="flex items-center justify-between p-3 hover:bg-gray-700/30 rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                          <div>
                            <p className="font-medium text-white">{song.title}</p>
                            <p className="text-sm text-gray-400">{song.artist}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500">⭐</span>
                          <span className="font-bold">{song.ratings || 0}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#1C1F26]/50 rounded-xl p-4 md:p-6 border border-gray-700/30">
                  <h3 className="text-lg font-bold text-white mb-4">System Status</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">API Status</span>
                        <span className="text-green-400 font-medium">Online</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Storage</span>
                        <span className="text-blue-400 font-medium">65% used</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-3/4"></div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-700/30">
                      <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Songs Tab */}
          {activeTab === "songs" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Song Management</h2>
                <button
                  onClick={() => openSongModal()}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Song
                </button>
              </div>
              {loading.songs ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
                </div>
              ) : (
                <div className="bg-[#1C1F26]/50 rounded-xl border border-gray-700/30 overflow-hidden">
                  <AdminSongTable
                    songs={songs}
                    onEdit={openSongModal}
                    onDelete={handleDeleteSong}
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white">User Management</h2>
                <button
                  onClick={() => {/* Add user functionality */}}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New User
                </button>
              </div>
              {loading.users ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
                </div>
              ) : (
                <div className="bg-[#1C1F26]/50 rounded-xl border border-gray-700/30 overflow-hidden">
                  <AdminUserTable users={users} />
                </div>
              )}
            </motion.div>
          )}

          {/* Other Tabs */}
          {activeTab === "albums" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-gray-700/50 flex items-center justify-center mb-6">
                <span className="text-4xl">💿</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Album Management</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                This feature is currently under development. You'll be able to manage albums and their details soon.
              </p>
            </motion.div>
          )}

          {activeTab === "ratings" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-gray-700/50 flex items-center justify-center mb-6">
                <span className="text-4xl">⭐</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Rating Management</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                View and manage user ratings and reviews. Coming soon!
              </p>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-gray-700/50 flex items-center justify-center mb-6">
                <span className="text-4xl">📈</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Detailed analytics and insights about your platform. Coming soon!
              </p>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-gray-700/50 flex items-center justify-center mb-6">
                <span className="text-4xl">⚙️</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Settings</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Configure platform settings and preferences. Coming soon!
              </p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Song Modal */}
      <AnimatePresence>
        {showSongModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={closeSongModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1C1F26] rounded-xl p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {editingSong ? "Edit Song" : "Add New Song"}
                </h2>
                <button
                  onClick={closeSongModal}
                  className="p-2 hover:bg-gray-700 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Song Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter song title"
                    value={formData.title}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Artist
                  </label>
                  <input
                    type="text"
                    name="artist"
                    placeholder="Enter artist name"
                    value={formData.artist}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Album
                  </label>
                  <input
                    type="text"
                    name="album"
                    placeholder="Enter album name"
                    value={formData.album}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Genre
                    </label>
                    <select
                      name="genre"
                      value={formData.genre}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                    >
                      <option value="">Select Genre</option>
                      <option value="Pop">Pop</option>
                      <option value="Rock">Rock</option>
                      <option value="Hip Hop">Hip Hop</option>
                      <option value="R&B">R&B</option>
                      <option value="Electronic">Electronic</option>
                      <option value="Indie">Indie</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      placeholder="3:45"
                      value={formData.duration}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Release Date
                  </label>
                  <input
                    type="date"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={closeSongModal}
                  className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSong}
                  className="flex-1 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-bold transition-colors"
                >
                  {editingSong ? "Update Song" : "Add Song"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}