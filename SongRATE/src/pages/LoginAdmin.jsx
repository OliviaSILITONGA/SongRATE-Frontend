// LoginPage.jsx - ADMIN VERSION
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Modal from "../components/Modal";

export default function AdminLoginPage() {
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
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    // Clear general error
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    const newErrors = {};

    // Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // You can replace this with actual API call
      const API_URL = import.meta.env.VITE_API_URL;
      
      // For now, using mock validation
      // In production, replace with real API call:
      // const response = await fetch(`${API_URL}/api/admin/login`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData)
      // });

      // Mock API response - Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Check admin credentials
      const isAdminValid = 
        formData.email === "admin@songrate.com" && 
        formData.password === "admin123";

      if (isAdminValid) {
        // Store admin session
        localStorage.setItem("adminToken", "admin-jwt-token-example");
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminEmail", formData.email);
        
        // Store admin data
        const adminData = {
          email: formData.email,
          name: "Super Admin",
          role: "admin",
          permissions: ["all"]
        };
        localStorage.setItem("adminData", JSON.stringify(adminData));
        
        // Show success modal
        setShowModal(true);
      } else {
        setErrors({
          general: "Invalid admin credentials. Please check your email and password."
        });
      }
      
    } catch (error) {
      console.error("Admin login error:", error);
      setErrors({
        general: "Failed to connect to server. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowModal(false);
    navigate("/admin/dashboard");
  };

  // Go back to user login
  const goToUserLogin = () => {
    navigate("/login");
  };

  // Go to main site
  const goToMainSite = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1D2128] to-[#30353F] px-6">
      {/* Success Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title="Admin Access Granted!"
        message="Welcome to the SongRate Admin Panel."
        type="success"
      />

      <div className="absolute top-6 left-6">
        <div onClick={goToMainSite} className="cursor-pointer">
          <Logo />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1B1D24] shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-700/50 relative"
      >
        {/* Admin Badge */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-yellow-500 text-black font-bold px-4 py-1 rounded-full text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            ADMIN PANEL
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-white mb-2 mt-4">
          Admin Access
        </h1>
        <p className="text-center text-gray-400 mb-6 text-sm">
          Restricted access for authorized personnel only
        </p>

        {/* General Error */}
        {errors.general && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errors.general}
            </p>
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col text-left">
            <label className="text-white font-medium mb-1 flex items-center justify-between">
              <span>Admin Email</span>
              <span className="text-xs text-gray-400 font-normal">admin@songrate.com</span>
            </label>
            <input
              type="email"
              name="email"
              className={`border rounded-lg text-gray-200 px-4 py-3 bg-[#3E424B] focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Enter admin email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col text-left">
            <label className="text-white font-medium mb-1 flex items-center justify-between">
              <span>Admin Password</span>
              <span className="text-xs text-gray-400 font-normal">admin123</span>
            </label>
            <input
              type="password"
              name="password"
              className={`border rounded-lg text-gray-200 px-4 py-3 bg-[#3E424B] focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${
                errors.password ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Enter admin password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          {/* Demo Credentials Note */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
            <p className="text-yellow-400 text-xs">
              <strong>Demo Credentials:</strong> admin@songrate.com / admin123
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
              isLoading
                ? "bg-gray-600 cursor-not-allowed text-gray-300"
                : "bg-yellow-500 text-black hover:bg-yellow-600 hover:shadow-lg"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verifying Access...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Access Admin Panel
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <button
              onClick={goToUserLogin}
              className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              User Login
            </button>
            
            <button
              onClick={goToMainSite}
              className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Main Site
            </button>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          © 2025 SongRate Admin Panel • Unauthorized access is prohibited
        </p>
      </motion.div>

      {/* Security Warning */}
      <div className="absolute bottom-6 text-center text-gray-500 text-xs">
        <p>This area is monitored. All activities are logged.</p>
      </div>
    </div>
  );
}