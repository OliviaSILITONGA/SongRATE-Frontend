export default function SongRatingCard({
  number,
  title,
  artist,
  albumCover,
  rating = 4,
  totalRatings = 12,
}) {
  return (
    <div className="flex items-center gap-2 bg-transparent rounded-2xl text-white min-h-[140px] shadow-lg w-[90%] max-w-[1600px]">
      <span className="text-4xl font-extrabold w-12 text-center">{number}</span>

      {/* COVER */}
      <img
        src={albumCover}
        alt={title}
        className="max-w-[100px] rounded-xl object-cover"
      />

      {/* TEXT + RATING */}
      <div className="flex justify-between items-center w-full">
        {/* TEXT */}
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-xl text-gray-300">{artist}</p>
        </div>

        {/* ⭐ RATING */}
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400 text-2xl">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </div>

          <span className="text-gray-300 text-xl">
            {totalRatings} {totalRatings < 10 ? "rating" : "ratings"}
          </span>
        </div>
      </div>
    </div>
  );
}
