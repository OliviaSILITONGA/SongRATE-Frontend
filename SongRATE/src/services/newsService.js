// API Base URL dengan fallback
let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "";
if (API_BASE_URL && !/^https?:\/\//.test(API_BASE_URL)) {
  API_BASE_URL = `https://${API_BASE_URL}`;
}
API_BASE_URL = API_BASE_URL.replace(/\/$/, "");

export async function getAllNews() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/news`);
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("getAllNews error:", err);
    // Return empty array so frontend won't break
    return [];
  }
}

export async function getNewsBySlug(slug) {
  if (!slug) return null;
  try {
    // Try endpoint by slug first
    let res = await fetch(`${API_BASE_URL}/api/news/${encodeURIComponent(slug)}`);
    if (res.ok) return await res.json();

    // Try by ID as fallback
    res = await fetch(`${API_BASE_URL}/api/news/${encodeURIComponent(slug)}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }

    // Final fallback: search in all news
    const all = await getAllNews();
    return (
      all.find(
        (n) => n.slug === slug || n.id === slug || String(n.id) === String(slug)
      ) || null
    );
  } catch (err) {
    console.error("getNewsBySlug error:", err);
    const all = await getAllNews();
    return (
      all.find(
        (n) => n.slug === slug || n.id === slug || String(n.id) === String(slug)
      ) || null
    );
  }
}

