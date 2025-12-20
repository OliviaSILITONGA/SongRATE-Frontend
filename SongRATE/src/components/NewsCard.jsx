import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NewsCard({ news, index }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link to={`/news/${news.slug}`}>
        <div className="group bg-gradient-to-b from-[#2E333E] to-[#1C1F26] rounded-2xl overflow-hidden border border-gray-700/30 hover:border-yellow-500/30 transition-all duration-300 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            {news.image && (
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            )}
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-yellow-500/20 text-yellow-400">
                {news.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="mb-3">
              <h2 className="text-xl font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                {news.title}
              </h2>
              
              <div className="flex items-center text-gray-400 text-sm mb-3">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {formatDate(news.createdAt)}
              </div>

              <p className="text-gray-300 text-sm line-clamp-3 mb-4 leading-relaxed">
                {news.excerpt}
              </p>
            </div>

            {/* Read More Button */}
            <div className="mt-auto pt-4 border-t border-gray-700/30">
              <div className="flex items-center text-yellow-500 font-medium text-sm group-hover:text-yellow-400 transition-colors">
                Read More
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}