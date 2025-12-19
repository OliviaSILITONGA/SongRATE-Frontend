import React from "react";

export default function AdminStatsCard({ title, value, change, icon }) {
  return (
    <div className="bg-[#2E333E] rounded-xl p-6 flex flex-col items-start">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-gray-400 text-sm">{title}</div>
      <div className="text-3xl font-bold mt-2">{value}</div>
      <div className="text-sm text-green-400 mt-1">{change}</div>
    </div>
  );
}
