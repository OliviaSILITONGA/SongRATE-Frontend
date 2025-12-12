import { useState } from "react";
import Home from "../components/Home";
import Logo from "../assets/SongRATE_White.png"; // Pastikan path gambar benar
import { Link, useNavigate } from "react-router-dom";

export default function RateMusicPage() {
  const [rating, setRating] = useState(0); 
  const [hover, setHover] = useState(0); 
  // Perhatikan: State bernama 'form', bukan 'formData'
  const [form, setForm] = useState({
    title: "",
    artist: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // VALIDASI
  const validateForm = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = "Song Title is required";
    if (!form.artist) newErrors.artist = "Artist is required";
    if (!rating) newErrors.rating = "Rating is required";
    if (!form.message) newErrors.message = "Message is required";
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

    // Ambil User ID dari LocalStorage
    const storedUser = localStorage.getItem("user"); 
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    // Gunakan fallback jika id disimpan sebagai 'userId' atau 'id'
    const userId = currentUser?.id || currentUser?.userId; 

    if (!userId) {
      alert("You must be logged in to rate!");
      navigate("/login");
      return;
    }

    // --- PERBAIKAN DI SINI ---
    // Menggunakan variabel 'form' dan state 'rating' yang benar
    const reviewData = {
      userId: userId,
      title: form.title,      // Diperbaiki dari formData.title
      artist: form.artist,    // Diperbaiki dari formData.artist
      rating: rating,         // Diperbaiki: ambil langsung dari state rating
      message: form.message   // Diperbaiki dari formData.message
    };

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Rating submitted successfully!");
        setForm({ title: "", artist: "", message: "" }); // Reset form
        setRating(0); // Reset rating
        navigate("/rating"); // Redirect ke halaman list rating
      } else {
        console.error("Server Error:", result);
        alert(`Failed: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Network error. Please ensure backend server is running on port 3000.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#2E333E] via-[#1C1F26] to-[#171A1F] text-white">
      <Home />

      <div className="max-w-3xl mx-auto pt-40 pb-20 relative px-6">
        {/* BG LOGO */}
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
              placeholder="Tell us what you think about this song..."
              className="w-full px-5 py-3 rounded-lg bg-[#3E424B] text-gray-200 outline-none focus:ring-2 focus:ring-yellow-500 transition"
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