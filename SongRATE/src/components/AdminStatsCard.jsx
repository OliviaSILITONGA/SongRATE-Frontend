import React from "react";

export default function AdminStatsCard({
  label,
  value,
  icon,
  color = "bg-blue-500",
}) {
  return (
    <div className="bg-[#1C1F26] rounded-lg border border-gray-700 p-6 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
        <div
          className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
