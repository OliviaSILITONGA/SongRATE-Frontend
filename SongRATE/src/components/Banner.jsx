import GrammyImg from "../assets/Grammy_Banner.png";

export default function Banner() {
  return (
    <div
      className="w-full h-[550px] bg-cover bg-center rounded-xl mt-30"
      style={{
        backgroundImage: `url(${GrammyImg})`,
      }}
    >
      <div className="w-full h-ful flex items-end pt-20 p-10 rounded-xl"></div>
    </div>
  );
}
