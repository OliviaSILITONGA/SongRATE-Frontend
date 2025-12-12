import { useState } from "react";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const API_URL = import.meta.env.VITE_API_URL

  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi jika field kosong
    if (
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      alert("Please fill in all required fields!");
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    // Validasi minimal panjang password
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    // Validasi kecocokan password
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match! Please confirm your password correctly.");
      return;
    }

    setIsLoading(true); // Mulai loading
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Regristasi selesai. silahkan login!.");
        navigate("/login"); // Arahkan ke login agar user bisa masuk dengan akun baru
      } else {
        // Jika gagal (misal: email sudah terdaftar)
        alert(data.message || "Regristasi gagal. Email anda sudah terdaftar");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Failed to connect to the server. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1D2128] to-[#30353F] px-6">
      <Logo />
      <div className="pt-30 w-full flex justify-center">
        <div className="bg-[#1B1D24] shadow-xl rounded-2xl p-8 w-full max-w-md">
          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Welcome!
          </h1>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="flex flex-col text-left">
              <label className="text-white font-medium mb-1">
                Full Name or Username
              </label>
              <input
                type="text"
                name="username"
                className="border rounded-lg text-gray-200 px-4 py-2 bg-[#3E424B] focus:outline-none focus:ring-2 focus:ring-[#FAD64F]"
                placeholder="Enter your name"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col text-left">
              <label className="text-white font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="border rounded-lg text-gray-200 px-4 py-2 bg-[#3E424B] focus:outline-none focus:ring-2 focus:ring-[#FAD64F]"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col text-left">
              <label className="text-white font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                className="border rounded-lg text-gray-200 px-4 py-2 bg-[#3E424B] focus:outline-none focus:ring-2 focus:ring-[#FAD64F]"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col text-left">
              <label className="text-white font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="border rounded-lg text-gray-200 px-4 py-2 bg-[#3E424B] focus:outline-none focus:ring-2 focus:ring-[#FAD64F]"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="bg-yellow-300 text-black font-bold py-2 rounded-lg hover:bg-yellow-200 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Link to login */}
          <p className="text-center font-medium text-gray-500 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-white font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}