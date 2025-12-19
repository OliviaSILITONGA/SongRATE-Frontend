import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Belum login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Login tapi bukan admin
  if (user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  // Admin boleh masuk
  return children;

  console.log("TOKEN:", token);
  console.log("USER:", user);
  console.log("ROLE:", user?.role);
}
