import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AdminSidebar({ isOpen, setIsOpen, activeTab, setActiveTab }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "songs", label: "Songs", icon: "🎵" },
    { id: "albums", label: "Albums", icon: "💿" },
    { id: "ratings", label: "Ratings", icon: "⭐" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen w-64 bg-[#1C1F26] border-r border-gray-700 z-50"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center">
            <span className="text-black font-bold">SR</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">SongRate Admin</h2>
            <p className="text-xs text-gray-400">Administrator Panel</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-yellow-500 text-black font-bold"
                    : "hover:bg-gray-700"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <div className="mt-8 p-4 border-t border-gray-700">
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              localStorage.removeItem("isAdmin");
              window.location.href = "/login";
            }}
            className="w-full flex items-center space-x-3 p-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </motion.aside>
  );
}