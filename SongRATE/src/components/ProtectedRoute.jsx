// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const adminToken = localStorage.getItem("adminToken");

  if (!isAdmin || !adminToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}