import { useState, useEffect } from "react";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { loginUser } from "../utils/authHelper";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); 
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Cek apakah sudah login, jika iya redirect
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        if (userData.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [navigate]);

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

    try {
      console.log("🔑 Attempting login with:", formData.email);
      const result = await loginUser(formData.email, formData.password);
      console.log("🔑 Login result:", result);

      if (result.success) {
        // Redirect berdasarkan role
        if (result.isAdmin) {
          // Langsung ke admin dashboard tanpa modal
          navigate("/admin", { replace: true });
        } else {
          // User biasa, tampilkan modal terlebih dahulu
          setShowModal(true);
        }
      } else {
        // Handle error dari API
        const errorMessage = result.error || "Login failed";
        console.error("❌ Login error message:", errorMessage);
        
        if (errorMessage.toLowerCase().includes("password")) {
            setErrors({ password: "Incorrect password" });
        } else if (errorMessage.toLowerCase().includes("user") || errorMessage.toLowerCase().includes("email") || errorMessage.toLowerCase().includes("not found")) {
            setErrors({ email: "Email not found" });
        } else {
            setErrors({ email: errorMessage });
        }
      }
    } catch (error) {
      console.error("🚨 Login exception:", error);
      setErrors({ email: `Connection error: ${error.message}` });
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