import { useState } from "react";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); 
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) {
        newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) { 
        newErrors.email = "Invalid email format (must contain @)";
    }

    if (!formData.password.trim()) {
        newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    setIsLoading(true);

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
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
        // Simpan token
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Tampilkan Modal Sukses
        setShowModal(true);
      } else {
        console.log(data);
        if (data.message?.toLowerCase().includes("password")) {
            setErrors({ password: "Incorrect password" });
        } else if (data.message?.toLowerCase().includes("user") || data.message?.toLowerCase().includes("email")) {
            setErrors({ email: "Email not found" });
        } else {
            // Error umum jika tidak spesifik
            setErrors({ email: data.message || "Login failed" });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1D2128] to-[#30353F] px-6">
      {/* Modal Sukses */}
      <Modal 
        isOpen={showModal} 
        onClose={() => navigate("/home")} 
        title="Welcome Back!" 
        message="Login successful."
        type="success"
      />

      <Logo />
      <div className="bg-[#1B1D24] shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-700/50">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back!
        </h1>

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
            {/* Error Merah */}
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
            {/* Error Merah */}
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <a
            className="text-right text-sm text-white hover:underline cursor-pointer"
            href="/forgot-password"
          >
            Forgot Password?
          </a>

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