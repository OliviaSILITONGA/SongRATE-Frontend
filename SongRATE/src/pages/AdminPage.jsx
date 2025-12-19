import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminStatsCard from "../components/AdminStatsCard";
import AdminUserTable from "../components/AdminUserTable";
import AdminSongTable from "../components/AdminSongTable";
import AdminRecentActivity from "../components/AdminRecentActivity";

export default function AdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  // Cek authentication (contoh sederhana)
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const adminToken = localStorage.getItem("adminToken");
    
    if (!isAdmin || !adminToken) {
      navigate("/login");
    }
  }, [navigate]);

  // Stats data
  const statsData = [
    { title: "Total Users", value: "1,234", change: "+12%", icon: "👥" },
    { title: "Total Ratings", value: "8,543", change: "+8%", icon: "⭐" },
    { title: "Total Songs", value: "567", change: "+5%", icon: "🎵" },
    { title: "Total Albums", value: "234", change: "+15%", icon: "💿" },
  ];

  // Recent activities
  const recentActivities = [
    { user: "John Doe", action: "rated a song", time: "5 mins ago", song: "Golden" },
    { user: "Alice Smith", action: "added review", time: "15 mins ago", song: "The Fate of Ophelia" },
    { user: "Bob Wilson", action: "created account", time: "1 hour ago" },
    { user: "Emma Brown", action: "rated album", time: "2 hours ago", album: "Eternal Sunshine" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen bg-[#171A1F] text-white"
    >
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Navigation */}
        <header className="bg-[#2E333E] border-b border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                  <span className="font-bold">A</span>
                </div>
                <span>Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your music rating platform</p>
          </div>

          {/* Stats Cards */}
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsData.map((stat, index) => (
                  <AdminStatsCard key={index} {...stat} />
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-[#2E333E] rounded-xl p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Recent Activity</h2>
                  <Link to="/admin/activities" className="text-yellow-500 hover:text-yellow-400">
                    View All →
                  </Link>
                </div>
                <AdminRecentActivity activities={recentActivities} />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#2E333E] rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-600">
                      Add New Song
                    </button>
                    <button className="w-full bg-gray-700 py-2 rounded-lg hover:bg-gray-600">
                      Manage Users
                    </button>
                    <button className="w-full bg-gray-700 py-2 rounded-lg hover:bg-gray-600">
                      View Reports
                    </button>
                  </div>
                </div>

                <div className="bg-[#2E333E] rounded-xl p-6 md:col-span-2">
                  <h3 className="text-lg font-bold mb-4">System Status</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Server Load</span>
                        <span>45%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-2/5"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Database</span>
                        <span>Healthy</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Users Management Tab */}
          {activeTab === "users" && (
            <div className="bg-[#2E333E] rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">User Management</h2>
                <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600">
                  Add New User
                </button>
              </div>
              <AdminUserTable />
            </div>
          )}

          {/* Songs Management Tab */}
          {activeTab === "songs" && (
            <div className="bg-[#2E333E] rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Song Management</h2>
                <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600">
                  Add New Song
                </button>
              </div>
              <AdminSongTable />
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="bg-[#2E333E] rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
              <div className="h-96 flex items-center justify-center text-gray-400">
                <p>Analytics charts and graphs will appear here</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </motion.div>
  );
}