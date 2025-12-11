import { useState } from "react";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Indikator loading

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validasi Input Dasar
    if (!formData.email.trim() || !formData.password.trim()) {
      alert("Please fill in both email and password fields!");
      return;
    }

    setIsLoading(true); // Mulai loading

    try {
      // 2. Panggil API Backend untuk Cek Database
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 3. Jika Login Sukses (Email & Password Cocok)
        // Simpan token (opsional: simpan user info juga)
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        alert("Login successful!");
        navigate("/home"); // Pindah ke halaman utama
      } else {
        // 4. Jika Gagal (Email tidak ada ATAU Password salah)
        // Backend mengirim pesan: "Invalid credentials"
        alert(data.message || "Login failed. Please check your email and password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to connect to the server. Make sure backend is running.");
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1D2128] to-[#30353F] px-6">
      <Logo />
      <div className="bg-[#1B1D24] shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back!
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col text-left">
            <label className="text-white font-medium mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="border rounded-lg text-gray-200 px-4 py-2 bg-[#3E424B] focus:outline-none focus:ring-2 focus:ring-[#FAD64F]"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col text-left">
            <label className="text-white font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="border rounded-lg text-gray-200 px-4 py-2 bg-[#3E424B] focus:outline-none focus:ring-2 focus:ring-[#FAD64F]"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          {/* Forgot password */}
          <a
            className="text-right text-sm text-white hover:underline cursor-pointer"
            href="/forgot-password"
          >
            Forgot Password?
          </a>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`font-bold py-2 rounded-lg transition ${
              isLoading 
                ? "bg-gray-500 cursor-not-allowed text-gray-300" 
                : "bg-[#FAD64F] text-black hover:bg-[#e6c247]"
            }`}
          >
            {isLoading ? "Checking..." : "Log in"}
          </button>
        </form>

        {/* Sign Up */}
        <p className="text-center text-gray-300 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-white font-medium hover:underline">
            Create an Account
          </a>
        </p>
      </div>
    </div>
  );
}