export default function AlbumCard({ title, image }) {
  return (
    <div className="bg-[#1c1c1c] p-4 rounded-xl text-white w-56">
      <img src={image} alt={title} className="rounded-xl mb-3" />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}
