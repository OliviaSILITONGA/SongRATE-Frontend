import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNewsBySlug } from "../services/newsService";

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    getNewsBySlug(slug).then(setNews);
  }, [slug]);

  if (!news) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <span className="text-pink-500 font-semibold">{news.category}</span>

      <h1 className="text-3xl font-bold mt-2">{news.title}</h1>

      <p className="text-gray-500 text-sm mt-2">
        {new Date(news.createdAt).toLocaleDateString()}
      </p>

      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          className="w-full rounded-xl my-6"
        />
      )}

      <article className="prose max-w-none">
        {news.content}
      </article>
    </div>
  );
}
