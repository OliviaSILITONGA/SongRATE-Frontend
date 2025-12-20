import { useEffect, useState } from "react";
import { getAllNews } from "../services/newsService";
import NewsCard from "../components/AdminNewsManagement";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNews()
      .then(setNews)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Latest News</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </div>
  );
}
