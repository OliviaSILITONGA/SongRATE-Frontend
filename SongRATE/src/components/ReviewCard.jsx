export default function ReviewCard({ image, name, review }) {
  return (
    <div className="bg-[#1c1c1c] p-6 rounded-xl text-white w-80">
      <div className="flex items-center gap-4 mb-3">
        <img src={image} className="w-14 h-14 rounded-full" />
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      <p className="text-gray-300 text-sm">{review}</p>
    </div>
  );
}
