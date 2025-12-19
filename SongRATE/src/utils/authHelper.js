/**
 * Authentication Helper
 * Menyediakan fungsi-fungsi untuk mengelola login, logout, dan session
 */

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Login user dengan email dan password
 * @param {string} email - Email user
 * @param {string} password - Password user
 * @returns {Promise<{token: string, user: object}>}
 */
export const loginUser = async (email, password) => {
  try {
    const endpoint = `${API_URL}/api/auth/login`;
    console.log("🔐 Login attempt to:", endpoint);
    console.log("📧 Email:", email);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("📊 Response status:", response.status);
    console.log("📊 Response ok:", response.ok);

    const data = await response.json();
    console.log("📦 Response data:", data);

    if (!response.ok) {
      const errorMsg = data.message || "Login failed";
      console.error("❌ Login error:", errorMsg);
      throw new Error(errorMsg);
    }

    // Simpan token dan user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", data.user.role);

    console.log("✅ Login successful!");
    return {
      success: true,
      token: data.token,
      user: data.user,
      isAdmin: data.user.role === "admin",
    };
  } catch (error) {
    console.error("🚨 Login exception:", error.message);
    console.error("🚨 Full error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Logout user
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
};

/**
 * Cek apakah user sudah login
 * @returns {boolean}
 */
export const isLoggedIn = () => {
  return !!localStorage.getItem("token") && !!localStorage.getItem("user");
};

/**
 * Cek apakah user adalah admin
 * @returns {boolean}
 */
export const isAdmin = () => {
  const role = localStorage.getItem("role");
  return role === "admin";
};

/**
 * Dapatkan current user
 * @returns {object|null}
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (error) {
    return null;
  }
};

/**
 * Dapatkan auth header untuk API calls
 * @returns {object}
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
