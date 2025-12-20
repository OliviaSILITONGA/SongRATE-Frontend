import { useEffect, useState } from "react";

export default function AdminNewsManagement() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);

  let API_BASE = import.meta.env.VITE_API_URL || "";
  if (API_BASE && !/^https?:\/\//.test(API_BASE))
    API_BASE = `https://${API_BASE}`;
  API_BASE = API_BASE.replace(/\/$/, "");

  const buildApi = (path) => (API_BASE ? `${API_BASE}${path}` : path);
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    image: "",
    isFeatured: false,
    status: "published",
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
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

  const handleAddNews = async () => {
    try {
      setError(null);
      setSuccess(null);

      const res = await fetch(buildApi("/api/news"), {
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
      resetForm();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateNews = async () => {
    try {
      setError(null);
      setSuccess(null);

      const res = await fetch(buildApi(`/api/news/${currentNews.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update news");
      setSuccess("News updated successfully!");
      await fetchNews();
      resetForm();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm("Delete this news?")) return;
    try {
      const res = await fetch(buildApi(`/api/news/${id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete news");
      await fetchNews();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOpenEdit = (item) => {
    setCurrentNews(item);
    setFormData(item);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      category: "",
      excerpt: "",
      content: "",
      image: "",
      isFeatured: false,
      status: "published",
    });
    setCurrentNews(null);
    setIsEditing(false);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmit = () => {
    if (isEditing) {
      handleUpdateNews();
    } else {
      handleAddNews();
    }
  };

  console.log("API_BASE:", API_BASE);

  return (
    <div className="p-8 text-white bg-[#1C1F26] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">News Management</h1>

      {error && <div className="mb-4 p-4 bg-red-600 rounded-lg">{error}</div>}
      {success && (
        <div className="mb-4 p-4 bg-green-600 rounded-lg">{success}</div>
      )}

      <button
        onClick={() => {
          setIsEditing(false);
          resetForm();
          setShowModal(true);
        }}
        className="mb-6 bg-pink-500 px-6 py-2 rounded-lg font-semibold"
      >
        + Add News
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full bg-[#2E333E] rounded-lg">
          <thead>
            <tr>
              <th className="p-4 text-left">Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((n) => (
              <tr key={n.id} className="border-t border-gray-700">
                <td className="p-4">{n.title}</td>
                <td>{n.category}</td>
                <td>{n.status}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleOpenEdit(n)}
                    className="px-3 py-1 bg-blue-600 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNews(n.id)}
                    className="px-3 py-1 bg-red-600 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#2E333E] border border-gray-700 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {isEditing ? "Edit News" : "Add News"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-[#1C1F26] text-white px-4 py-2 rounded-lg border border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full bg-[#1C1F26] text-white px-4 py-2 rounded-lg border border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full bg-[#1C1F26] text-white px-4 py-2 rounded-lg border border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Excerpt
                </label>
                <input
                  type="text"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className="w-full bg-[#1C1F26] text-white px-4 py-2 rounded-lg border border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows="5"
                  className="w-full bg-[#1C1F26] text-white px-4 py-2 rounded-lg border border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full bg-[#1C1F26] text-white px-4 py-2 rounded-lg border border-gray-600"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="mr-2"
                  />
                  Featured
                </label>

                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full bg-[#1C1F26] text-white px-4 py-2 rounded-lg border border-gray-600"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-lg"
              >
                {isEditing ? "Update" : "Add"}
              </button>
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
