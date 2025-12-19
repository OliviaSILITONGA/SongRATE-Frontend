import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/authHelper";
import Logo from "../assets/SongRATE_White.png";

export default function AdminSidebar({
  isOpen,
  setIsOpen,
  activeTab,
  setActiveTab,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    // Tambahkan clear admin session
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminData");
    navigate("/admin/login", { replace: true });
  };

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
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        className="fixed left-0 top-0 h-screen w-64 bg-[#1C1F26] border-r border-gray-700/50 z-50 shadow-2xl"
      >
        {/* Logo Section - Centered */}
        <div className="flex flex-col items-center justify-center py-6 px-4 border-b border-gray-700/50">
          <button
            onClick={() => navigate("/admin")}
            className="focus:outline-none hover:opacity-80 transition-transform hover:scale-105"
          >
            <img 
              src={Logo} 
              alt="SongRATE Logo" 
              className="h-10 w-auto md:h-12" 
            />
          </button>
          
          {/* Admin Badge */}
          <div className="mt-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1">
            <span className="text-yellow-400 text-xs font-medium flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ADMIN PANEL
            </span>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute right-3 top-6 p-1 text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 h-[calc(100vh-140px)] overflow-y-auto sidebar-scrollbar">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    // Close sidebar on mobile after selection
                    if (window.innerWidth < 1024) {
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                    activeTab === item.id
                      ? "bg-yellow-500 text-black font-bold shadow-lg"
                      : "hover:bg-gray-700/50 text-gray-300"
                  }`}
                >
                  <span className={`text-lg ${activeTab === item.id ? 'text-black' : 'group-hover:text-yellow-400'}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm md:text-base">{item.label}</span>
                  {activeTab === item.id && (
                    <span className="ml-auto w-2 h-2 bg-black rounded-full"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Logout Button */}
          <div className="mt-8 p-4 border-t border-gray-700/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all group"
            >
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-sm md:text-base">Logout Admin</span>
            </button>
            
            {/* Current User Info */}
            <div className="mt-4 p-3 bg-gray-800/30 rounded-lg">
              <p className="text-xs text-gray-400 text-center">
                Logged in as <span className="text-yellow-400 font-medium">Admin</span>
              </p>
            </div>
          </div>
        </nav>

        {/* Bottom Version Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-700/30">
          <p className="text-[10px] text-gray-500 text-center">
            v1.0.0 • Admin Panel
          </p>
        </div>
      </motion.aside>
    </>
  );
}