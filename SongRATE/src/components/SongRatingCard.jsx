export default function SongRatingCard({ number, title, artist, albumCover }) {
  return (
    <div className="flex items-center gap-4 bg-[#1A1A1A] p-4 rounded-xl text-white">
      <span className="text-3xl font-bold w-10 text-center">{number}</span>

      <img
        src={albumCover}
        alt={title}
        className="w-16 h-16 rounded-lg object-cover"
      />

      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-300">{artist}</p>
      </div>
    </div>
  );
}
