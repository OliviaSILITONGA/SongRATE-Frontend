import { useState } from "react";
import Home from "../components/Home";
import Logo from "../assets/SongRATE_White.png";
import { useNavigate } from "react-router-dom";

export default function RateMusicPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [form, setForm] = useState({
    title: "",
    artist: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  // Gunakan Environment Variable agar dinamis
  const API_URL = import.meta.env.VITE_API_URL;

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Hapus error jika user mulai mengetik
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  // VALIDASI
  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Song Title is required";
    if (!form.artist.trim()) newErrors.artist = "Artist is required";
    if (rating === 0) newErrors.rating = "Please select a star rating";
    if (!form.message.trim()) newErrors.message = "Review message is required";
    return newErrors;
  };

  // HANDLE SUBMIT KE DATABASE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateForm();
    if (Object.keys(validation).length !== 0) {
      setErrors(validation);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must login first.");
      navigate("/login");
      return;
    }

    const reviewData = {
      title: form.title,
      artist: form.artist,
      rating: rating,
      message: form.message,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit review");
      }

      alert("Rating submitted successfully!");
      setForm({ title: "", artist: "", message: "" });
      setRating(0);
      navigate("/rating");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white">
      <Home />

      <div className="max-w-3xl mx-auto pt-40 pb-20 relative px-6">
        <img
          src={Logo}
          className="absolute opacity-10 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          alt="Background Logo"
        />

        <h1 className="text-5xl font-bold text-center mb-14">Rate Music</h1>

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
              className="w-full px-5 py-3 rounded-lg bg-[#3E424B] text-gray-200 outline-none focus:ring-2 focus:ring-yellow-500 transition"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-red-400 mt-1 text-sm">{errors.title}</p>
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
              className="w-full px-5 py-3 rounded-lg bg-[#3E424B] text-gray-200 outline-none focus:ring-2 focus:ring-yellow-500 transition"
              disabled={isSubmitting}
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
                  className={`cursor-pointer transition transform hover:scale-110 ${
                    (hover || rating) >= star
                      ? "text-yellow-400"
                      : "text-gray-500"
                  }`}
                  onMouseEnter={() => !isSubmitting && setHover(star)}
                  onMouseLeave={() => !isSubmitting && setHover(0)}
                  onClick={() => !isSubmitting && setRating(star)}
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
              placeholder="Tell us what you think about this song..."
              className="w-full px-5 py-3 rounded-lg bg-[#3E424B] text-gray-200 outline-none focus:ring-2 focus:ring-yellow-500 transition"
              disabled={isSubmitting}
            ></textarea>
            {errors.message && (
              <p className="text-red-400 mt-1 text-sm">{errors.message}</p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-yellow-300 hover:bg-yellow-200 text-black font-semibold px-20 py-3 rounded-lg transition transform hover:scale-105 shadow-lg ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      <footer className="bg-[#3E424B85] text-gray-300 py-10 px-4 md:px-20">
        <div className="text-center text-gray-500 text-sm mt-10">
          © 2025 SongRate
        </div>
      </footer>
    </div>
  );
}
