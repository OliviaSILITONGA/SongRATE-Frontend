import React from "react";

export default function AdminSongTable() {
  return (
    <div>
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="text-gray-400">
            <th className="p-2">Title</th>
            <th className="p-2">Artist</th>
            <th className="p-2">Ratings</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-700">
            <td className="p-2 text-gray-300">No songs yet</td>
            <td className="p-2 text-gray-300">—</td>
            <td className="p-2 text-gray-300">—</td>
            <td className="p-2 text-gray-300">—</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
