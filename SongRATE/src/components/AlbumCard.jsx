export default function AlbumCard({ title, artist, rating, image }) {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={image}
        alt={title}
        className="w-full max-w-[200px] rounded-lg shadow-lg"
      />

      <h3 className="mt-3 font-semibold text-lg">{title}</h3>
      <p className="text-gray-300 text-sm">{artist}</p>
      <p className="text-yellow-400 mt-1">★ {rating}</p>
    </div>
  );
}
