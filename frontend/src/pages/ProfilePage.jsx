import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // URL param

  /* ============================================================
      🔥 FIX 1 — Prevent /profile/undefined
      - If the URL does not match the logged-in user's ID → fix URL
  ============================================================ */
  useEffect(() => {
    if (user) {
      if (!id || id === "undefined") {
        navigate(`/profile/${user._id}`, { replace: true });
      }
    }
  }, [id, user, navigate]);

  /* ============================================================
      🔥 FIX 2 — Admin Dashboard Redirect Button
  ============================================================ */
  const goDashboard = () => {
    navigate("/admin/dashboard");
  };

  /* ============================================================
      🔒 If user is NOT logged in
  ============================================================ */
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700 font-semibold">
          You are not logged in.
        </p>
      </div>
    );
  }

  /* ============================================================
      PAGE UI
  ============================================================ */
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-[#130745] mb-6 text-center">
          Profile
        </h2>

        {/* ======================== PROFILE DETAILS ======================== */}
        <div className="space-y-4 text-lg text-gray-800">
          <p>
            <strong>Full Name:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            <span className="capitalize">{user.role}</span>
          </p>
        </div>

        {/* ======================== ADMIN BUTTON ======================== */}
        {user.role === "admin" && (
          <button
            onClick={goDashboard}
            className="mt-6 w-full py-3 rounded-xl text-white font-semibold text-lg 
              bg-blue-700 hover:bg-blue-800 transition-all shadow-md"
          >
            Go to Admin Dashboard
          </button>
        )}

        {/* ======================== LOGOUT ======================== */}
        <button
          onClick={() => {
            logout();
            navigate("/login"); // ⭐ FIX — always redirect after logout
          }}
          className="mt-4 w-full py-3 rounded-xl text-white font-semibold text-lg 
            bg-gradient-to-r from-[#130745] to-[#1a0a5e] hover:opacity-90 shadow-md 
            transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
