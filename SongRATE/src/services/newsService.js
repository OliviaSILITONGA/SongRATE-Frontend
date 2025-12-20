export async function getAllNews() {
  try {
    const res = await fetch("/api/news");
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("getAllNews error:", err);
    // Fallback mock data so frontend won't break during development
    return [
      {
        id: 1,
        title: "Welcome to SongRATE",
        category: "Announcement",
        excerpt: "Platform launched",
        content: "This is a demo news item.",
        image: "",
        status: "published",
      },
    ];
  }
}

export async function getNewsBySlug(slug) {
  if (!slug) return null;
  try {
    // Try endpoint by slug first
    let res = await fetch(`/api/news/${encodeURIComponent(slug)}`);
    if (res.ok) return await res.json();

    // Try query param fallback
    res = await fetch(`/api/news?slug=${encodeURIComponent(slug)}`);
    if (res.ok) {
      const data = await res.json();
      // if API returns array, return first match
      if (Array.isArray(data)) return data[0] || null;
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
