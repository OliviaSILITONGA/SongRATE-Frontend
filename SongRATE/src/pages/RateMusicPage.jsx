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
      <footer className="bg-[#3E424B85] text-gray-300 py-10 px-4 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* CONTACT */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Text Message
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
                Instagram
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.279 16.736 5.018 15.022 5 12c.018-3.024.279-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.721 7.264 18.982 8.978 19 12c-.018 3.024-.279 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/>
                </svg>
                TikTok
              </li>
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
                className="w-full px-4 py-2 rounded-l-lg bg-[#3E424B] text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="bg-yellow-500 px-4 rounded-r-lg hover:bg-yellow-600 transition duration-300">
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
