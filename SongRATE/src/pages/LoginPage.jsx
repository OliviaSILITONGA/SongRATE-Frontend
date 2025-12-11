import { useState } from "react";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};

    // Validasi Field Kosong & Format Email
    if (!formData.email.trim()) {
      newErrors.email = "Username or Email is required";
    } else if (formData.email.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // Validasi Password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      // Ini yang akan muncul di bawah password
      newErrors.password = "Password must be at least 6 characters long"; 
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1D2128] to-[#30353F] px-6">
      <Logo />
      <div className="bg-[#1B1D24] shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back!
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col text-left">
            <label className="text-white font-medium mb-1">
              Username or Email
            </label>
            <input
              type="text"
              name="email"
              className={`border rounded-lg text-gray-200 px-4 py-2 bg-[#3E424B] focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-transparent focus:ring-[#FAD64F]"
              }`}
              placeholder="Username or Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col text-left">
            <label className="text-white font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              className={`border rounded-lg text-gray-200 px-4 py-2 bg-[#3E424B] focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-transparent focus:ring-[#FAD64F]"
              }`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <a
            className="text-right text-sm text-white hover:underline cursor-pointer"
            href="/forgot-password"
          >
            Forgot Password?
          </a>

          <button
            type="submit"
            className="bg-[#FAD64F] text-black font-bold py-2 rounded-lg hover:bg-[#e6c247] transition"
          >
            Log in
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