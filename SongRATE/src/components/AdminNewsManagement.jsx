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
  const buildApi = (path) => `${API_BASE}${path}`;

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
      const res = await fetch(`${API_BASE}/api/news`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch news");
      setNews(await res.json());
    } catch (err) {
      console.error(err);
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
      title: item.title,
      slug: item.slug,
      category: item.category,
      excerpt: item.excerpt,
      content: item.content,
      image: item.image,
      isFeatured: item.isFeatured,
      status: item.status,
    });
    setCurrentNews(null);
  };

  console.log("API_BASE:", API_BASE);

  return (
    <div className="p-8 text-white bg-[#1C1F26] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">News Management</h1>

      <button
        onClick={() => setShowModal(true)}
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
    </div>
  );
}
