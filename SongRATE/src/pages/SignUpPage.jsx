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

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
        newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      <div className="pt-30 w-full flex justify-center">
        <div className="bg-[#1B1D24] shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-white mb-6">Welcome!</h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="flex flex-col text-left">
              <label className="text-white font-medium mb-1">Full Name or Username</label>
              <input
                type="text"
                name="username"
                className={`border rounded-lg text-gray-200 px-4 py-2 bg-[#3E424B] focus:outline-none focus:ring-2 ${errors.username ? "border-red-500 focus:ring-red-500" : "border-transparent focus:ring-[#FAD64F]"}`}
                placeholder="Enter your name"
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col text-left">
              <label className="text-white font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                className={`border rounded-lg text-gray-200 px-4 py-2 bg-[#3E424B] focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-500" : "border-transparent focus:ring-[#FAD64F]"}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col text-left">
              <label className="text-white font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                className={`border rounded-lg text-gray-200 px-4 py-2 bg-[#3E424B] focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:ring-red-500" : "border-transparent focus:ring-[#FAD64F]"}`}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col text-left">
              <label className="text-white font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className={`border rounded-lg text-gray-200 px-4 py-2 bg-[#3E424B] focus:outline-none focus:ring-2 ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-transparent focus:ring-[#FAD64F]"}`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" className="bg-yellow-300 text-black font-bold py-2 rounded-lg hover:bg-yellow-200 transition">
              Sign Up
            </button>
          </form>

          <p className="text-center font-medium text-gray-500 mt-4">
            Already have an account? <a href="/login" className="text-white font-medium hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}