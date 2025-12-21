import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import AdminSidebar from "../components/AdminSidebar";
import AdminStatsCard from "../components/AdminStatsCard";
import AdminSongTable from "../components/AdminSongTable";
import AdminUserTable from "../components/AdminUserTable";
import AdminRecentActivity from "../components/AdminRecentActivity";
import ArtistManagement from "../components/ArtistManagement";
import AdminNewsManagement from "../components/AdminNewsManagement";
import AdminRatingManagement from "../components/AdminRatingManagement";

// API Base URL dengan fallback
let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "";
if (API_BASE_URL && !/^https?:\/\//.test(API_BASE_URL)) {
  API_BASE_URL = `https://${API_BASE_URL}`;
}
API_BASE_URL = API_BASE_URL.replace(/\/$/, "");

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [activeTab, setActiveTab] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

  const [songs, setSongs] = useState([]);
  const [users, setUsers] = useState([]);
  const [news, setNews] = useState([]);

  const [loading, setLoading] = useState({ songs: false, users: false });
  const [loadingNews, setLoadingNews] = useState(false);

  /* ===================== AUTH ===================== */
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  /* ===================== RESPONSIVE SIDEBAR ===================== */
  useEffect(() => {
    const resize = () => setIsOpen(window.innerWidth >= 1024);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ===================== FETCH SONGS ===================== */
  const fetchSongs = async () => {
    setLoading((l) => ({ ...l, songs: true }));
    try {
      const res = await fetch(`${API_BASE_URL}/api/songs`);
      if (!res.ok) throw new Error("Songs API error");
      const data = await res.json();
      setSongs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch songs:", err);
      setSongs([]);
    } finally {
      setLoading((l) => ({ ...l, songs: false }));
    }
  };

  /* ===================== FETCH USERS ===================== */
  const fetchUsers = async () => {
    setLoading((l) => ({ ...l, users: true }));
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Users API error");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([]);
    } finally {
      setLoading((l) => ({ ...l, users: false }));
    }
  };

  /* ===================== FETCH NEWS ===================== */
  const fetchNews = async () => {
    try {
      setLoadingNews(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/api/admin/news`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to fetch news");
      }

      const data = await res.json();
      setNews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch news:", err);
      setNews([]);
    } finally {
      setLoadingNews(false);
    }
  };

  /* ===================== INIT ===================== */
  useEffect(() => {
    fetchSongs();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (activeTab === "news") fetchNews();
  }, [activeTab]);

  /* ===================== LOGOUT ===================== */
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-[#1C1F26] text-white">
      <AdminSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className={`flex-1 transition-all ${isOpen ? "lg:ml-64" : ""}`}>
        {/* HEADER */}
        <header className="p-4 border-b border-gray-700 flex justify-between">
          <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </header>

        {/* CONTENT */}
        <div className="p-6 space-y-6">
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <AdminStatsCard label="Songs" value={songs.length} />
                <AdminStatsCard label="Users" value={users.length} />
                <AdminStatsCard
                  label="Active Users"
                  value={users.filter((u) => u.status === "active").length}
                />
                <AdminStatsCard
                  label="Ratings"
                  value={songs.reduce((a, b) => a + (b.ratings || 0), 0)}
                />
              </div>

              <AdminRecentActivity songs={songs} users={users} />
            </>
          )}

          {activeTab === "songs" && (
            <AdminSongTable songs={songs} loading={loading.songs} />
          )}

          {activeTab === "users" && (
            <AdminUserTable users={users} loading={loading.users} />
          )}

          {activeTab === "news" && <AdminNewsManagement />}

          {activeTab === "ratings" && <AdminRatingManagement />}

          {activeTab === "artist" && <ArtistManagement />}
        </div>
      </main>
    </div>
  );
}