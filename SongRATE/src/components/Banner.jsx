import { useNavigate } from "react-router-dom";
import GrammyImage from "../assets/Grammy_HD.png"; // Anda perlu menambahkan gambar Grammy

export default function Banner() {
  const navigate = useNavigate();

  return (
    <div className="relative mt-24 mx-4 md:mx-8 lg:mx-16 mb-12 md:mb-16">
      {/* Background dengan gradient dan efek blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2E333E] via-[#292E37] to-[#1D21288A] rounded-2xl opacity-95"></div>

      {/* Efek cahaya di belakang */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-purple-500/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-tl from-pink-500/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Konten utama */}
      <div className="relative z-10 p-6 md:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Gambar Grammy Awards di kiri */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-start animate-fade-in-left">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-white/10 to-purple-300/20 rounded-3xl flex items-center justify-center p-4 shadow-2xl backdrop-blur-sm border border-white/20">
                {/* Anda bisa menambahkan gambar aktual di sini */}
                <img
                  src={GrammyImage}
                  alt="Grammy Awards 2026"
                  className="w-full h-auto rounded-xl"
                />
              </div>

              {/* Efek cahaya di belakang gambar */}
              <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>

              {/* Partikel dekoratif */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
              <div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>

          {/* Teks dan tombol di kanan */}
          <div className="w-full lg:w-3/5 text-center lg:text-left animate-fade-in-right">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight">
                2026 Grammy Awards Nominations
              </h1>

              <p className="text-lg md:text-xl text-gray-100 mb-8 md:mb-10 opacity-90">
                The most prestigious music awards ceremony is back! Discover
                which artists, albums, and songs have been nominated for the
                66th Annual Grammy Awards.
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => navigate("/grammy-nominations")}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-10 rounded-lg text-lg md:text-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl inline-flex items-center gap-3 group"
                >
                  <span>See the full nominees list</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>

                <div className="text-gray-200 text-sm md:text-base flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Over 90 categories
                  </span>
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Live ceremony February 2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dekorasi tambahan */}
      <div className="absolute top-10 left-10 opacity-20 animate-float">
        <svg className="w-10 h-10" fill="white" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      </div>
      <div
        className="absolute bottom-10 right-10 opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
          <path d="M9 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3H9z" />
        </svg>
      </div>
    </div>
  );
}
