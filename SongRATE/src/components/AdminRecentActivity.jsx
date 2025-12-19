import React from "react";

export default function AdminRecentActivity({ activities = [] }) {
  return (
    <div className="space-y-3">
      {activities.length === 0 ? (
        <div className="text-gray-400">No recent activity</div>
      ) : (
        activities.map((a, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-[#22252B] p-3 rounded-lg"
          >
            <div>
              <div className="text-sm text-gray-300 font-semibold">
                {a.user}
              </div>
              <div className="text-xs text-gray-400">
                {a.action} {a.song || a.album || ""}
              </div>
            </div>
            <div className="text-xs text-gray-500">{a.time}</div>
          </div>
        ))
      )}
    </div>
  );
}
