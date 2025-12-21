import { useEffect, useState } from "react";

export default function AdminNewsManagement() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /* ================= API ================= */
  let API_BASE = import.meta.env.VITE_API_URL || "";
  if (API_BASE && !/^https?:\/\//.test(API_BASE))
    API_BASE = `https://${API_BASE}`;
  API_BASE = API_BASE.replace(/\/$/, "");

  const buildApi = (path) => (API_BASE ? `${API_BASE}${path}` : path);
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

      const res = await fetch(buildApi("/api/admin/news"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch news");
      }

      const data = await res.json();
      setNews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch news error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= INPUT HANDLER ================= */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
      if (!formData.category.trim()) {
        setError("Category is required");
        return;
      }
      if (!formData.content.trim()) {
        setError("Content is required");
        return;
      }

      // Generate slug if not provided
      const slug = formData.slug || formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // Generate excerpt if not provided
      const excerpt = formData.excerpt || formData.content.slice(0, 150) + "...";

      const payload = {
        ...formData,
        slug,
        excerpt,
      };

      const res = await fetch(buildApi("/api/admin/news"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMessage = responseData.message || responseData.error || `Failed to add news (${res.status})`;
        throw new Error(errorMessage);
      }

      setSuccess("News added successfully!");
      await fetchNews();
      closeModal();
    } catch (err) {
      console.error("Add news error:", err);
      setError(err.message);
    }
  };

  /* ================= UPDATE ================= */
  const handleUpdateNews = async () => {
    try {
      setError(null);
      setSuccess(null);

      if (!formData.title.trim()) {
        setError("Title is required");
        return;
      }

      // Generate slug if not provided
      const slug = formData.slug || formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // Generate excerpt if not provided
      const excerpt = formData.excerpt || (formData.content ? formData.content.slice(0, 150) + "..." : "");

      const payload = {
        ...formData,
        slug,
        excerpt,
      };

      const res = await fetch(buildApi(`/api/admin/news/${currentNews.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMessage = responseData.message || responseData.error || `Failed to update news (${res.status})`;
        throw new Error(errorMessage);
      }

      setSuccess("News updated successfully!");
      await fetchNews();
      closeModal();
    } catch (err) {
      console.error("Update news error:", err);
      setError(err.message);
    }
  };

  /* ================= DELETE ================= */
  const handleDeleteNews = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;

    try {
      setError(null);

      const res = await fetch(buildApi(`/api/admin/news/${id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMessage = responseData.message || responseData.error || `Failed to delete news (${res.status})`;
        throw new Error(errorMessage);
      }

      setSuccess("News deleted successfully!");
      await fetchNews();
    } catch (err) {
      console.error("Delete news error:", err);
      setError(err.message);
    }
  };

  /* ================= MODAL ================= */
  const handleOpenAdd = () => {
    setFormData(emptyForm);
    setCurrentNews(null);
    setIsEditing(false);
    setShowModal(true);
    setError(null);
    setSuccess(null);
  };

  const handleOpenEdit = (item) => {
    setCurrentNews(item);
    setFormData({
      title: item.title || "",
      slug: item.slug || "",
      category: item.category || "",
      excerpt: item.excerpt || "",
      content: item.content || "",
      image: item.image || "",
      isFeatured: item.isFeatured || false,
      status: item.status || "published",
    });
    setIsEditing(true);
    setShowModal(true);
    setError(null);
    setSuccess(null);
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
            className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-lg font-semibold transition"
          >
            + Add News
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
            {success}
            <button
              onClick={() => setSuccess(null)}
              className="ml-4 underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading news...</div>
        ) : news.length === 0 ? (
          <div className="text-center py-12 bg-[#2E333E] rounded-xl text-gray-400">
            No news yet. Add your first article!
          </div>
        ) : (
          <div className="bg-[#2E333E] rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#3E424B]">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold">Title</th>
                    <th className="text-left px-6 py-4 font-semibold">Category</th>
                    <th className="text-left px-6 py-4 font-semibold">Status</th>
                    <th className="text-left px-6 py-4 font-semibold">Featured</th>
                    <th className="text-left px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((n) => (
                    <tr key={n.id} className="border-t border-gray-700 hover:bg-[#3E424B] transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {n.image && (
                            <img
                              src={n.image}
                              alt={n.title}
                              className="w-12 h-8 rounded object-cover"
                            />
                          )}
                          <span className="font-semibold">{n.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-semibold">
                          {n.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${n.status === "published"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                          }`}>
                          {n.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {n.isFeatured ? (
                          <span className="text-yellow-400">⭐ Featured</span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleOpenEdit(n)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteNews(n.id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2E333E] rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                {isEditing ? "Edit News" : "Add New News"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="News title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <input
                    type="text"
                    name="category"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="e.g., Music, Artists, Industry"
                    value={formData.category}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Slug (optional - auto-generated from title)
                  </label>
                  <input
                    type="text"
                    name="slug"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="news-slug-here"
                    value={formData.slug}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Excerpt (optional - auto-generated from content)
                  </label>
                  <input
                    type="text"
                    name="excerpt"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Short description..."
                    value={formData.excerpt}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Content *</label>
                  <textarea
                    name="content"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Full news content..."
                    rows="5"
                    value={formData.content}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="https://example.com/news-image.jpg"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded"
                  />
                  <label className="ml-2 text-sm font-medium">Featured Article</label>
                </div>
              </div>

              <div className="flex space-x-3 mt-8">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditing ? handleUpdateNews : handleAddNews}
                  className="flex-1 px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg transition font-semibold"
                >
                  {isEditing ? "Update" : "Add"} News
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
