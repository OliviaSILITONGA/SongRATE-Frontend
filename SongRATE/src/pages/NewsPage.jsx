import Home from "../components/Home";

export default function NewsPage() {
  const newsArticles = [
    {
      id: 1,
      title: "Taylor Swift Breaks Record with 4th Album of the Year Grammy Win",
      date: "February 5, 2024",
      category: "Awards",
      excerpt: "Taylor Swift made history at the 66th Grammy Awards by becoming the first artist to win Album of the Year four times...",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "BTS Announces Comeback with New Album 'The New Chapter'",
      date: "January 28, 2024",
      category: "Releases",
      excerpt: "K-pop supergroup BTS has announced their highly anticipated comeback with a new album scheduled for release in April...",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Drake Launches Record-Breaking World Tour 'It's All a Blur'",
      date: "January 20, 2024",
      category: "Tours",
      excerpt: "Drake has announced his biggest world tour yet, with 80 shows across North America and Europe expected to gross over $500 million...",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Adele Returns to Las Vegas with Extended Residency",
      date: "January 15, 2024",
      category: "Concerts",
      excerpt: "Following her successful 'Weekends with Adele' residency, the singer has announced an additional 32 shows through 2025...",
      image: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Billie Eilish Reveals New Album Details in Exclusive Interview",
      date: "January 10, 2024",
      category: "Interviews",
      excerpt: "In an exclusive interview with SongRate, Billie Eilish opened up about her creative process and upcoming third studio album...",
      image: "https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "Ed Sheeran Collaborates with Latin Artists for Spanish-Language EP",
      date: "January 5, 2024",
      category: "Collaborations",
      excerpt: "Ed Sheeran surprises fans with announcement of a Spanish-language EP featuring collaborations with Bad Bunny and Rosalía...",
      image: "https://images.unsplash.com/photo-1520707136151-2f494b6c6d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const featuredNews = {
    id: 7,
    title: "Beyoncé Announces Renaissance World Tour Part II",
    date: "February 1, 2024",
    category: "Breaking News",
    excerpt: "Following the massive success of her Renaissance World Tour, Beyoncé has announced Part II with 40 additional dates across Asia and Australia. The tour will feature new production elements and surprise guest appearances.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fullContent: "Beyoncé has sent shockwaves through the music industry with the announcement of Renaissance World Tour Part II. The additional leg comes after the unprecedented success of her original 56-show tour, which grossed over $580 million and broke attendance records in multiple stadiums worldwide. Part II will include stops in Tokyo, Seoul, Sydney, Melbourne, and several other major cities across Asia and Australia. Insiders suggest the production will be even more elaborate than the first leg, with new costume designs and innovative stage technology. Ticket pre-sales for verified fans begin on February 15, with general sales starting February 22."
  };

     return (
       <div className="min-h-screen bg-gradient-to-bl pt-[180px] from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white">
         <Home />

      {/* Title */}
      <h2 className="text-5xl text-center font-bold mb-2">News</h2>
      <p className="text-center text-gray-400 mb-12">Latest updates from the music world</p>

      {/* Featured News */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-[#3E424B] to-[#2E333E] rounded-2xl overflow-hidden shadow-2xl">
          <div className="md:flex">
            <div className="md:w-2/3 p-8">
              <div className="flex items-center mb-4">
                <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  {featuredNews.category}
                </span>
                <span className="text-gray-400 text-sm ml-4">{featuredNews.date}</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">{featuredNews.title}</h3>
              <p className="text-gray-300 mb-6">{featuredNews.excerpt}</p>
              <button className="bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
                Read Full Story
              </button>
            </div>
            <div className="md:w-1/3">
              <img 
                src={featuredNews.image} 
                alt={featuredNews.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <h3 className="text-2xl font-bold mb-8">Latest News</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <div 
              key={article.id} 
              className="bg-gradient-to-b from-[#3E424B] to-[#2E333E] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-yellow-500 text-sm font-semibold">{article.category}</span>
                  <span className="text-gray-400 text-sm">{article.date}</span>
                </div>
                <h4 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h4>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                <button className="text-yellow-500 font-semibold text-sm hover:text-yellow-400 transition duration-300">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#3E424B85] text-gray-300 py-10 px-4 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* CONTACT */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Text Message
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
                Instagram
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.279 16.736 5.018 15.022 5 12c.018-3.024.279-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.721 7.264 18.982 8.978 19 12c-.018 3.024-.279 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/>
                </svg>
                TikTok
              </li>
            </ul>
          </div>

          {/* SUBSCRIBE */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Subscribe to Us</h2>
            <p className="text-sm mb-4">
              We'll send you the latest releases, news, and offers.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-l-lg bg-[#3E424B] text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="bg-yellow-500 px-4 rounded-r-lg hover:bg-yellow-600 transition duration-300">
                <svg width="20" height="20" fill="black" viewBox="0 0 24 24">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-10">
          © 2025 SongRate
        </div>
      </footer>
    </div>
  );
}