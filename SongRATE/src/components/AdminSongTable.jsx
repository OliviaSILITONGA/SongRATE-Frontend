import React from "react";

export default function AdminSongTable({ songs = [], onEdit, onDelete }) {
  return (
    <div className="bg-[#1C1F26] rounded-lg border border-gray-700 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700 bg-gray-900">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Judul
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Artis
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Album
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Genre
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Durasi
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {songs && songs.length > 0 ? (
            songs.map((song) => (
              <tr
                key={song.id}
                className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 text-white">{song.title}</td>
                <td className="px-6 py-4 text-gray-300">{song.artist}</td>
                <td className="px-6 py-4 text-gray-300">{song.album}</td>
                <td className="px-6 py-4 text-gray-300">{song.genre}</td>
                <td className="px-6 py-4 text-gray-300">{song.duration}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(song)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Apakah Anda yakin ingin menghapus lagu ini?"
                          )
                        ) {
                          onDelete(song.id);
                        }
                      }}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="border-b border-gray-700">
              <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                Belum ada lagu yang ditambahkan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
