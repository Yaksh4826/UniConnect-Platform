import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, token, isAdmin, isStaff, isStudent } = useAuth();

  // ------------------------------------------------------------
  // 1️⃣ NOT LOGGED IN → Redirect to Login
  // ------------------------------------------------------------
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // ------------------------------------------------------------
  // 2️⃣ ROLE VALIDATION
  //    If a route requires a specific role (admin/staff/student)
  // ------------------------------------------------------------
  if (role) {
    const roleCheck =
      (role === "admin" && isAdmin()) ||
      (role === "staff" && isStaff()) ||
      (role === "student" && isStudent());

    if (!roleCheck) {
      // ❌ Not authorized → go to homepage
      return <Navigate to="/" replace />;
    }
  }

  // ------------------------------------------------------------
  // 3️⃣ ALLOW ACCESS
  // ------------------------------------------------------------
  return children;
}
