import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "";
if (API_BASE_URL && !/^https?:\/\//.test(API_BASE_URL)) {
    API_BASE_URL = `https://${API_BASE_URL}`;
}
API_BASE_URL = API_BASE_URL.replace(/\/$/, "");

export default function AdminRatingManagement() {
    const [ratings, setRatings] = useState([]);
    const [stats, setStats] = useState({
        totalRatings: 0,
        avgRating: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        topRatedSongs: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleteId, setDeleteId] = useState(null);

    const fetchRatings = async () => {
        try {
            setLoading(true);
            setError("");
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_BASE_URL}/api/admin/ratings`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch ratings");
            }

            const data = await res.json();
            setRatings(data.ratings || []);
            setStats(data.stats || {
                totalRatings: 0,
                avgRating: 0,
                distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
                topRatedSongs: []
            });
        } catch (err) {
            console.error("Fetch ratings error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRatings();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE_URL}/api/admin/ratings/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to delete rating");
            }

            setRatings(ratings.filter(r => r.id !== id));
            setDeleteId(null);
            fetchRatings(); // Refresh stats
        } catch (err) {
            console.error("Delete rating error:", err);
            setError(err.message);
        }
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-600"}>
                ★
            </span>
        ));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-6"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Total Ratings</p>
                            <p className="text-3xl font-bold text-white">{stats.totalRatings}</p>
                        </div>
                        <span className="text-4xl">⭐</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-6"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Average Rating</p>
                            <p className="text-3xl font-bold text-white">{stats.avgRating}</p>
                        </div>
                        <span className="text-4xl">📊</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-6 col-span-1 md:col-span-2"
                >
                    <p className="text-gray-400 text-sm mb-3">Rating Distribution</p>
                    <div className="flex items-end justify-between h-16 gap-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex flex-col items-center flex-1">
                                <div
                                    className="w-full bg-yellow-400/80 rounded-t"
                                    style={{
                                        height: `${Math.max((stats.distribution[star] / Math.max(...Object.values(stats.distribution), 1)) * 100, 5)}%`,
                                        minHeight: '4px'
                                    }}
                                ></div>
                                <span className="text-xs text-gray-400 mt-1">{star}★</span>
                                <span className="text-xs text-white font-medium">{stats.distribution[star]}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Top Rated Songs */}
            {stats.topRatedSongs && stats.topRatedSongs.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#252830] rounded-xl p-6 border border-gray-700/50"
                >
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        🏆 Top Rated Songs
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stats.topRatedSongs.slice(0, 6).map((song, index) => (
                            <div
                                key={index}
                                className="bg-[#1C1F26] rounded-lg p-4 border border-gray-700/30"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="font-medium text-white truncate">{song.title}</p>
                                        <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-yellow-400 font-bold">{song.avgRating} ★</p>
                                        <p className="text-xs text-gray-500">{song.count} reviews</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-red-400">{error}</p>
                </div>
            )}

            {/* Ratings List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#252830] rounded-xl border border-gray-700/50 overflow-hidden"
            >
                <div className="p-6 border-b border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        📝 All Ratings ({ratings.length})
                    </h3>
                </div>

                {ratings.length === 0 ? (
                    <div className="p-12 text-center">
                        <span className="text-6xl mb-4 block">📭</span>
                        <p className="text-gray-400">No ratings yet</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-700/50 max-h-[600px] overflow-y-auto">
                        {ratings.map((rating) => (
                            <motion.div
                                key={rating.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-4 hover:bg-[#1C1F26] transition-colors"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold">
                                                {rating.user?.username?.charAt(0).toUpperCase() || "?"}
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">
                                                    {rating.user?.username || "Unknown User"}
                                                </p>
                                                <p className="text-xs text-gray-500">{rating.user?.email}</p>
                                            </div>
                                        </div>

                                        <div className="ml-13 pl-13">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-lg">{renderStars(rating.rating)}</span>
                                                <span className="text-sm text-gray-400">({rating.rating}/5)</span>
                                            </div>
                                            <p className="font-medium text-white">{rating.title}</p>
                                            <p className="text-sm text-gray-400 mb-2">by {rating.artist}</p>
                                            <p className="text-gray-300 text-sm bg-[#1C1F26] p-3 rounded-lg">
                                                "{rating.message}"
                                            </p>
                                            <p className="text-xs text-gray-500 mt-2">
                                                {formatDate(rating.createdAt)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        {deleteId === rating.id ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleDelete(rating.id)}
                                                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => setDeleteId(null)}
                                                    className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setDeleteId(rating.id)}
                                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition"
                                                title="Delete Rating"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}