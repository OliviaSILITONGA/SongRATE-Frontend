import Menu from "../components/Menu";
import { useState } from "react";

export default function ChartPage() {
  const [timeRange, setTimeRange] = useState("weekly");
  const [chartType, setChartType] = useState("global");

  const weeklyChartData = [
    {
      id: 1,
      rank: 1,
      title: "Fortnight",
      artist: "Taylor Swift ft. Post Malone",
      album: "The Tortured Poets Department",
      streams: "45.2M",
      change: "new",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: "3:42"
    },
    {
      id: 2,
      rank: 2,
      title: "Like That",
      artist: "Future, Metro Boomin, Kendrick Lamar",
      album: "We Don't Trust You",
      streams: "38.7M",
      change: "up",
      changeAmount: 1,
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: "4:28"
    },
    {
      id: 3,
      rank: 3,
      title: "Espresso",
      artist: "Sabrina Carpenter",
      album: "Singular: Act II",
      streams: "36.5M",
      change: "up",
      changeAmount: 3,
      image: "https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: "3:02"
    },
    {
      id: 4,
      rank: 4,
      title: "Too Sweet",
      artist: "Hozier",
      album: "Unreal Unearth",
      streams: "34.1M",
      change: "down",
      changeAmount: 2,
      image: "https://images.unsplash.com/photo-1520707136151-2f494b6c6d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: "3:51"
    },
    {
      id: 5,
      rank: 5,
      title: "A Bar Song (Tipsy)",
      artist: "Shaboozey",
      album: "Where I've Been, Isn't Where I'm Going",
      streams: "32.8M",
      change: "up",
      changeAmount: 5,
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: "3:48"
    },
    {
      id: 6,
      rank: 6,
      title: "Beautiful Things",
      artist: "Benson Boone",
      album: "Fireworks & Rollerblades",
      streams: "30.2M",
      change: "steady",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: "3:34"
    },
    {
      id: 7,
      rank: 7,
      title: "Lose Control",
      artist: "Teddy Swims",
      album: "Lose Control",
      streams: "28.9M",
      change: "up",
      changeAmount: 2,
      image: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: "3:30"
    },
    {
      id: 8,
      rank: 8,
      title: "I Had Some Help",
      artist: "Post Malone ft. Morgan Wallen",
      album: "Single",
      streams: "27.5M",
      change: "new",
      image: "https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: "3:18"
    },
    {
      id: 9,
      rank: 9,
      title: "Million Dollar Baby",
      artist: "Tommy Richman",
      album: "Single",
      streams: "26.3M",
      change: "down",
      changeAmount: 4,
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: "2:55"
    },
    {
      id: 10,
      rank: 10,
      title: "Texas Hold 'Em",
      artist: "Beyoncé",
      album: "Cowboy Carter",
      streams: "25.8M",
      change: "steady",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: "4:10"
    }
  ];

  const monthlyChartData = [
    {
      id: 1,
      rank: 1,
      title: "Cruel Summer",
      artist: "Taylor Swift",
      album: "Lover",
      streams: "180.5M",
      change: "steady",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: "2:58"
    },
    {
      id: 2,
      rank: 2,
      title: "Flowers",
      artist: "Miley Cyrus",
      album: "Endless Summer Vacation",
      streams: "165.3M",
      change: "steady",
      image: "https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: "3:20"
    },
    {
      id: 3,
      rank: 3,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      streams: "158.7M",
      change: "steady",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: "3:20"
    }
  ];

  const regionalChartData = [
    {
      id: 1,
      rank: 1,
      title: "Vampire Empire",
      artist: "Big Thief",
      album: "Single",
      streams: "22.4M",
      region: "US",
      image: "https://images.unsplash.com/photo-1520707136151-2f494b6c6d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: "3:25"
    },
    {
      id: 2,
      rank: 1,
      title: "Dilemma",
      artist: "Green Day",
      album: "Saviors",
      streams: "18.9M",
      region: "UK",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: "3:40"
    },
    {
      id: 3,
      rank: 1,
      title: "Tacones Rojos",
      artist: "Sebastián Yatra",
      album: "Dharma",
      streams: "25.1M",
      region: "Latin America",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: "3:12"
    }
  ];

  const chartData = chartType === "global" 
    ? (timeRange === "weekly" ? weeklyChartData : monthlyChartData)
    : regionalChartData;

  const getChangeIcon = (change, amount) => {
    switch(change) {
      case "up":
        return (
          <div className="flex items-center text-green-400">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-semibold">{amount || 1}</span>
          </div>
        );
      case "down":
        return (
          <div className="flex items-center text-red-400">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-semibold">{amount || 1}</span>
          </div>
        );
      case "new":
        return (
          <div className="flex items-center text-yellow-500">
            <span className="text-xs font-bold px-2 py-1 bg-yellow-500/20 rounded">NEW</span>
          </div>
        );
      case "steady":
        return (
          <div className="flex items-center text-gray-400">
            <span className="text-xs">—</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl pt-[140px] from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white">
      <Menu />

      {/* Title */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl text-center font-bold mb-2">Top Charts</h2>
        <p className="text-center text-gray-400 mb-8">Global music rankings updated daily</p>

        {/* Chart Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-[#2E333E] rounded-xl p-4">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-gray-400">Time Range:</span>
            <div className="flex bg-[#3E424B] rounded-lg p-1">
              <button
                className={`px-4 py-2 rounded-md transition ${timeRange === "weekly" ? "bg-yellow-500 text-black font-semibold" : "hover:bg-[#4A4F5A]"}`}
                onClick={() => setTimeRange("weekly")}
              >
                Weekly
              </button>
              <button
                className={`px-4 py-2 rounded-md transition ${timeRange === "monthly" ? "bg-yellow-500 text-black font-semibold" : "hover:bg-[#4A4F5A]"}`}
                onClick={() => setTimeRange("monthly")}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Chart Type Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Chart Type:</span>
            <div className="flex bg-[#3E424B] rounded-lg p-1">
              <button
                className={`px-4 py-2 rounded-md transition ${chartType === "global" ? "bg-yellow-500 text-black font-semibold" : "hover:bg-[#4A4F5A]"}`}
                onClick={() => setChartType("global")}
              >
                Global
              </button>
              <button
                className={`px-4 py-2 rounded-md transition ${chartType === "regional" ? "bg-yellow-500 text-black font-semibold" : "hover:bg-[#4A4F5A]"}`}
                onClick={() => setChartType("regional")}
              >
                Regional
              </button>
            </div>
          </div>
        </div>

        {/* Chart Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-[#3E424B] rounded-t-xl text-gray-400 text-sm font-semibold">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-5">Track</div>
          <div className="col-span-3">Album</div>
          <div className="col-span-1 text-center">Streams</div>
          <div className="col-span-1 text-center">Change</div>
          <div className="col-span-1 text-center">Duration</div>
        </div>

        {/* Chart List */}
        <div className="mb-16">
          {chartData.map((song) => (
            <div 
              key={song.id} 
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 px-4 md:px-6 py-4 hover:bg-[#3E424B]/50 border-b border-[#4A4F5A] transition duration-300"
            >
              {/* Rank - Mobile & Desktop */}
              <div className="md:col-span-1 flex items-center justify-center">
                <div className="relative">
                  <span className={`text-2xl font-bold ${song.rank <= 3 ? "text-yellow-500" : "text-gray-300"}`}>
                    {song.rank}
                  </span>
                  {song.rank <= 3 && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full"></div>
                  )}
                </div>
              </div>

              {/* Track Info - Mobile First */}
              <div className="md:col-span-5 flex items-center">
                <div className="flex-shrink-0 w-14 h-14 md:w-12 md:h-12 rounded-md overflow-hidden mr-4">
                  <img 
                    src={song.image} 
                    alt={song.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg md:text-base">{song.title}</h3>
                  <p className="text-gray-400 text-sm">{song.artist}</p>
                  {song.region && (
                    <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded mt-1 inline-block">
                      {song.region}
                    </span>
                  )}
                </div>
              </div>

              {/* Album - Hidden on Mobile */}
              <div className="md:col-span-3 hidden md:flex items-center">
                <p className="text-gray-300">{song.album}</p>
              </div>

              {/* Streams */}
              <div className="md:col-span-1 flex md:block items-center justify-between md:justify-center">
                <span className="md:hidden text-gray-400">Streams: </span>
                <span className="text-gray-300 font-semibold">{song.streams}</span>
              </div>

              {/* Change */}
              <div className="md:col-span-1 flex md:block items-center justify-between md:justify-center">
                <span className="md:hidden text-gray-400">Change: </span>
                {getChangeIcon(song.change, song.changeAmount)}
              </div>

              {/* Duration & Play Button */}
              <div className="md:col-span-1 flex items-center justify-between md:justify-center">
                <span className="text-gray-400">{song.duration}</span>
                <button className="md:hidden p-2 rounded-full bg-yellow-500/20 hover:bg-yellow-500 transition">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Top Artist This Week */}
          <div className="bg-gradient-to-br from-[#3E424B] to-[#2E333E] rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Top Artist This Week
            </h3>
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                alt="Taylor Swift"
                className="w-16 h-16 rounded-full border-2 border-yellow-500 mr-4"
              />
              <div>
                <h4 className="text-lg font-bold">Taylor Swift</h4>
                <p className="text-gray-400 text-sm">3 songs in top 10</p>
                <p className="text-yellow-500 text-sm font-semibold">+215M streams</p>
              </div>
            </div>
          </div>

          {/* Biggest Climber */}
          <div className="bg-gradient-to-br from-[#3E424B] to-[#2E333E] rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              Biggest Climber
            </h3>
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                alt="Shaboozey"
                className="w-16 h-16 rounded-full border-2 border-green-400 mr-4"
              />
              <div>
                <h4 className="text-lg font-bold">Shaboozey</h4>
                <p className="text-gray-400 text-sm">"A Bar Song (Tipsy)"</p>
                <p className="text-green-400 text-sm font-semibold">↑ 5 positions</p>
              </div>
            </div>
          </div>

          {/* Most Added to Playlists */}
          <div className="bg-gradient-to-br from-[#3E424B] to-[#2E333E] rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
              Most Playlisted
            </h3>
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                alt="Sabrina Carpenter"
                className="w-16 h-16 rounded-full border-2 border-purple-400 mr-4"
              />
              <div>
                <h4 className="text-lg font-bold">Sabrina Carpenter</h4>
                <p className="text-gray-400 text-sm">"Espresso"</p>
                <p className="text-purple-400 text-sm font-semibold">+850K playlists</p>
              </div>
            </div>
          </div>
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
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
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