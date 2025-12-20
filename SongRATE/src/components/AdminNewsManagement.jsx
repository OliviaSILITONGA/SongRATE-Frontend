import { useEffect, useState } from "react";

export default function AdminNewsManagement() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);

  /* ================= API ================= */
  let API_BASE = import.meta.env.VITE_API_URL || "";
  if (API_BASE && !/^https?:\/\//.test(API_BASE)) {
    API_BASE = `https://${API_BASE}`;
  }
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

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    if (!token) {
      setError("Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(buildApi("/api/news"), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to fetch news");
      }

      const data = await res.json();
      setNews(Array.isArray(data) ? data : []);
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

      const res = await fetch(buildApi("/api/news"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to add news");
      }

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
        buildApi(`/api/news/${currentNews.id}`),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update news");
      }

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
      const res = await fetch(buildApi(`/api/news/${id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to delete news");
      }

      await fetchNews();
    } catch (err) {
      setError(err.message);
    }
  };

  /* ================= EDIT ================= */
  const handleOpenEdit = (item) => {
    setCurrentNews(item);
    setFormData({
      title: item.title || "",
      slug: item.slug || "",
      category: item.category || "",
      excerpt: item.excerpt || "",
      content: item.content || "",
      image: item.image || "",
      isFeatured: !!item.isFeatured,
      status: item.status || "published",
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentNews(null);
    setFormData(emptyForm);
  };

  const handleSubmit = () => {
    isEditing ? handleUpdateNews() : handleAddNews();
  };

  console.log("API BASE:", API_BASE);

  /* ================= UI ================= */
  return (
    <div className="p-8 text-white bg-[#1C1F26] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">News Management</h1>

      {error && <div className="mb-4 p-4 bg-red-600 rounded">{error}</div>}
      {success && <div className="mb-4 p-4 bg-green-600 rounded">{success}</div>}

      <button
        onClick={() => {
          setIsEditing(false);
          setFormData(emptyForm);
          setShowModal(true);
        }}
        className="mb-6 bg-pink-500 px-6 py-2 rounded font-semibold"
      >
        + Add News
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full bg-[#2E333E] rounded">
          <thead>
            <tr>
              <th className="p-4 text-left">Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#2E333E] p-8 rounded-xl max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6">
              {isEditing ? "Edit News" : "Add News"}
            </h2>

            {/* FORM — tetap seperti punyamu */}
            {/* (tidak kuubah biar UI aman) */}

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-pink-500 py-2 rounded font-bold"
              >
                {isEditing ? "Update" : "Add"}
              </button>
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-600 py-2 rounded font-bold"
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
