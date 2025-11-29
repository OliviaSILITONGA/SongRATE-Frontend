import { useState } from "react";
import Menu from "../components/Menu";
import Logo from "../assets/SongRATE_White.png";
import { Link } from "react-router-dom";

export default function RateMusicPage() {
  const [rating, setRating] = useState(0); // nilai rating (1–5)
  const [hover, setHover] = useState(0); // hover effect
  const [form, setForm] = useState({
    title: "",
    album: "",
    artist: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // VALIDASI
  const validateForm = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = "Song Title is required";
    if (!form.album) newErrors.album = "Album is required";
    if (!form.artist) newErrors.artist = "Artist is required";
    if (!rating) newErrors.rating = "Rating is required";
    if (!form.message) newErrors.message = "Message is required";
    return newErrors;
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateForm();
    if (Object.keys(validation).length !== 0) {
      setErrors(validation);
      return;
    }

    // SUCCESS
    alert("Your rating has been submitted successfully!");

    // RESET FORM
    setForm({
      title: "",
      album: "",
      artist: "",
      message: "",
    });
    setRating(0);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white">
      <Menu />

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto pt-40 pb-20 relative px-6">
        {/* BG LOGO */}
        <img
          src={Logo}
          className="absolute opacity-10 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          alt="Background Logo"
        />

        <h1 className="text-5xl font-bold text-center mb-14">Rate Music</h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-10 relative">
          {/* SONG TITLE */}
          <div>
            <label className="block mb-2 text-gray-300">Song Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Insert here..."
              className="w-full px-5 py-3 rounded-lg bg-[#3E424B] text-gray-200 outline-none"
            />
            {errors.title && (
              <p className="text-red-400 mt-1 text-sm">{errors.title}</p>
            )}
          </div>

          {/* ALBUM */}
          <div>
            <label className="block mb-2 text-gray-300">Album</label>
            <input
              type="text"
              name="album"
              value={form.album}
              onChange={handleChange}
              placeholder="Insert here..."
              className="w-full px-5 py-3 rounded-lg bg-[#3E424B] text-gray-200 outline-none"
            />
            {errors.album && (
              <p className="text-red-400 mt-1 text-sm">{errors.album}</p>
            )}
          </div>

          {/* ARTIST */}
          <div>
            <label className="block mb-2 text-gray-300">Artist</label>
            <input
              type="text"
              name="artist"
              value={form.artist}
              onChange={handleChange}
              placeholder="Insert here..."
              className="w-full px-5 py-3 rounded-lg bg-[#3E424B] text-gray-200 outline-none"
            />
            {errors.artist && (
              <p className="text-red-400 mt-1 text-sm">{errors.artist}</p>
            )}
          </div>

          {/* RATING */}
          <div className="text-center">
            <div className="flex justify-center gap-6 text-4xl text-gray-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer transition ${
                    (hover || rating) >= star
                      ? "text-yellow-400"
                      : "text-gray-500"
                  }`}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-400 mt-2 text-sm">{errors.rating}</p>
            )}
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block mb-2 text-gray-300">Message</label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              placeholder="Insert Here"
              className="w-full px-5 py-3 rounded-lg bg-[#3E424B] text-gray-200 outline-none"
            ></textarea>
            {errors.message && (
              <p className="text-red-400 mt-1 text-sm">{errors.message}</p>
            )}
          </div>

          {/* SUBMIT */}
          <div className="flex justify-center">
            <Link
              to="/posted"
              className="bg-yellow-300 hover:bg-yellow-200 text-black font-semibold px-20 py-3 rounded-lg transition"
            >
              Submit
            </Link>
          </div>
        </form>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#3E424B85] text-gray-300 py-10 px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* CONTACT */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <ul className="space-y-2">
              <li>Text Message</li>
              <li>Instagram</li>
              <li>TikTok</li>
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
