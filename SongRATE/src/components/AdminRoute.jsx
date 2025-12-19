import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  // Belum login
  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = JSON.parse(userStr);
  } catch (error) {
    return <Navigate to="/login" replace />;
  }

  // Login tapi bukan admin
  if (role !== "admin" || user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  // Admin boleh masuk
  return children;
}
