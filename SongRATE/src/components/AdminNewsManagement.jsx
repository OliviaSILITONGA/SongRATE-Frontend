import { useEffect, useState } from "react";

export default function AdminNewsManagement() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /* ================= API (SAMA DENGAN SONG) ================= */
  let API_BASE = import.meta.env.VITE_API_URL || "";
  if (API_BASE && !/^https?:\/\//.test(API_BASE))
    API_BASE = `https://${API_BASE}`;
  API_BASE = API_BASE.replace(/\/$/, "");

  const buildApi = (path) => `${API_BASE}${path}`;
  const token = localStorage.getItem("token");

  /* ================= FORM ================= */
  const emptyForm = {
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    image: "",
    isFeatured: false,
    status: "published",
  };

  const [formData, setFormData] = useState(emptyForm);

  /* ================= FETCH NEWS ================= */
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(buildApi("/api/news"), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch news");

      const data = await res.json();
      setNews(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ADD ================= */
  const handleAddNews = async () => {
    try {
      setError(null);
      setSuccess(null);

      if (!formData.title.trim()) {
        setError("Title is required");
        return;
      }

      const res = await fetch(buildApi("/api/admin/news"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add news");

      setSuccess("News added successfully!");
      await fetchNews();
      closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  /* ================= UPDATE ================= */
  const handleUpdateNews = async () => {
    try {
      setError(null);
      setSuccess(null);

      const res = await fetch(
        buildApi(`/api/admin/news/${currentNews.id}`),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update news");

      setSuccess("News updated successfully!");
      await fetchNews();
      closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  /* ================= DELETE ================= */
  const handleDeleteNews = async (id) => {
    if (!window.confirm("Delete this news?")) return;

    try {
      const res = await fetch(buildApi(`/api/admin/news/${id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete news");

      setSuccess("News deleted successfully!");
      await fetchNews();
    } catch (err) {
      setError(err.message);
    }
  };

  /* ================= MODAL ================= */
  const handleOpenAdd = () => {
    setFormData(emptyForm);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setCurrentNews(item);
    setFormData(item);
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentNews(null);
    setFormData(emptyForm);
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#1C1F26] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">News Management</h1>
            <p className="text-gray-400">Manage all news articles</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-lg font-semibold"
          >
            + Add News
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded">
            {success}
          </div>
        )}

        {/* Table */}
        {loading ? (
          <p>Loading...</p>
        ) : news.length === 0 ? (
          <div className="text-center py-12 bg-[#2E333E] rounded-xl">
            No news yet.
          </div>
        ) : (
          <div className="bg-[#2E333E] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#3E424B]">
                <tr>
                  <th className="text-left px-6 py-4">Title</th>
                  <th className="text-left px-6 py-4">Category</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-left px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {news.map((n) => (
                  <tr key={n.id} className="border-t border-gray-700">
                    <td className="px-6 py-4">{n.title}</td>
                    <td className="px-6 py-4 text-gray-400">
                      {n.category}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {n.status}
                    </td>
                    <td className="px-6 py-4 space-x-3">
                      <button
                        onClick={() => handleOpenEdit(n)}
                        className="px-4 py-2 bg-blue-600 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNews(n.id)}
                        className="px-4 py-2 bg-red-600 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#2E333E] rounded-xl p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">
                {isEditing ? "Edit News" : "Add News"}
              </h2>

              <input
                className="w-full mb-3 px-4 py-2 bg-[#1C1F26] rounded"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <input
                className="w-full mb-3 px-4 py-2 bg-[#1C1F26] rounded"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />

              <textarea
                className="w-full mb-4 px-4 py-2 bg-[#1C1F26] rounded"
                placeholder="Content"
                rows="4"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-600 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditing ? handleUpdateNews : handleAddNews}
                  className="flex-1 bg-pink-500 py-2 rounded font-bold"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
