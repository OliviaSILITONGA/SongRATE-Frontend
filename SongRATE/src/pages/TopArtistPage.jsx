import Menu from "../components/Menu";

export default function TopArtistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white">
      <Menu />

      <h2 className="text-4xl font-bold">Top Artist</h2>
      <p className="text-gray-400 mt-2">
        Discover the best artists with the most streamed songs.
      </p>

      <div className="mt-10 flex justify-center">
        <img
          src="/mnt/data/Top Artist.png"
          className="rounded-2xl shadow-2xl w-[90%]"
        />
      </div>

      {/* FOOTER */}
      <footer className="bg-[#3E424B85] text-gray-300 py-10 px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* CONTACT */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <ul className="space-y-2">
              <li>Email: songrate@gmail.com</li>
              <li>Instagram: @songrate</li>
              <li>Twitter: @songrate</li>
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
                className="w-full px-4 py-2 rounded-l-lg bg-[#3E424B] text-gray-200 focus:outline-none"
              />
              <button className="bg-yellow-500 px-4 rounded-r-lg">
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
