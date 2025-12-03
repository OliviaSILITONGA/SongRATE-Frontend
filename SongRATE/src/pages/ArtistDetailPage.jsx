import { useParams } from "react-router-dom";
import detailArtists from "../data/detailArtists"; // ← ini harus benar
import Menu from "../components/Menu";

export default function ArtistDetailPage() {
  const { id } = useParams();
  const artist = detailArtists.find((a) => a.id === Number(id));

  if (!artist) {
    return (
      <div className="text-white p-20 text-center">
        <h1 className="text-3xl font-bold">Artist not found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-bl pt-[140px] from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white">
      <Menu />

      {/* Header */}
      <div className="max-w-5xl mx-auto mt-10 flex flex-col md:flex-row items-center gap-10 px-10">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-56 h-56 rounded-full object-cover border-2 border-gray-500 shadow-xl"
        />

        <div>
          <h1 className="text-5xl font-bold">{artist.name}</h1>

          <p className="text-gray-300 mt-4 leading-relaxed">
            {artist.bio || "This artist bio will be updated soon."}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="max-w-4xl mx-auto mt-14 px-10">
        <h2 className="text-2xl font-bold">Top Songs</h2>

        <div className="mt-6 space-y-5">
          {(artist.songs || []).map((song, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-[#1F222A] px-6 py-4 rounded-xl"
            >
              <div>
                <p className="font-bold">{song.title}</p>
                <p className="text-gray-400 text-sm">{song.artist}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-xl">★★★★★</span>
                <p className="text-gray-400">
                  {song.reviews.toLocaleString()} reviews
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#3E424B85] text-gray-300 py-10 px-20 mt-20">
        <div className="text-center text-gray-500 text-sm">© 2025 SongRate</div>
      </footer>
    </div>
  );
}
