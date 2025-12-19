import React from "react";

export default function AdminUserTable({ users = [] }) {
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-[#1C1F26] rounded-lg border border-gray-700 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700 bg-gray-900">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              ID
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Nama
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Email
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Tanggal Daftar
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 text-gray-300">{user.id}</td>
                <td className="px-6 py-4 text-white font-medium">
                  {user.name || "-"}
                </td>
                <td className="px-6 py-4 text-gray-300">{user.email}</td>
                <td className="px-6 py-4 text-gray-300">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                    ✓ Aktif
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                      Lihat
                    </button>
                    <button className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md text-sm font-medium transition-colors">
                      Verifikasi
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="border-b border-gray-700">
              <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                Belum ada user yang terdaftar
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
