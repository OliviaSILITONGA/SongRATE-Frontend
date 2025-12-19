import React from "react";

export default function AdminRecentActivity({ songs = [], users = [] }) {
  const recentActivities = [];

  // Simulasi recent activities dari songs dan users
  if (songs && songs.length > 0) {
    songs.slice(0, 3).forEach((song) => {
      recentActivities.push({
        type: "song",
        title: `Lagu "${song.title}" ditambahkan`,
        description: `oleh ${song.artist}`,
        time: "Baru saja",
        icon: "🎵",
      });
    });
  }

  if (users && users.length > 0) {
    users.slice(0, 2).forEach((user) => {
      recentActivities.push({
        type: "user",
        title: `User baru: ${user.name}`,
        description: user.email,
        time: "Hari ini",
        icon: "👤",
      });
    });
  }

  return (
    <div className="bg-[#1C1F26] rounded-lg border border-gray-700 p-6">
      <h3 className="text-xl font-bold text-white mb-4">Aktivitas Terbaru</h3>
      <div className="space-y-3">
        {recentActivities.length === 0 ? (
          <div className="text-gray-400 text-center py-8">
            Belum ada aktivitas terbaru
          </div>
        ) : (
          recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{activity.icon}</div>
                <div>
                  <p className="text-white font-medium">{activity.title}</p>
                  <p className="text-gray-400 text-sm">
                    {activity.description}
                  </p>
                </div>
              </div>
              <span className="text-gray-400 text-xs">{activity.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
