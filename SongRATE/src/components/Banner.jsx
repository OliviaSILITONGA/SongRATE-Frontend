import GrammyImg from "../assets/Grammy.png";

export default function Banner() {
  return (
    <div
      className="w-full h-[400px] bg-cover bg-center rounded-xl mt-6"
      style={{
        backgroundImage: `url(${GrammyImg})`,
      }}
    >
      <div className="w-full h-full bg-black/40 flex items-end p-10 rounded-xl">
        <h2 className="text-white text-4xl font-bold">
          2026 Grammy Awards Nominations
        </h2>
      </div>
    </div>
  );
}
