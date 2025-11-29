import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-[#130745] mb-6 text-center">
          Profile
        </h2>

        <div className="space-y-4 text-lg">
          <p><strong>Full Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

        <button
          onClick={() => { logout(); navigate("/login"); }}
          className="mt-6 w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-[#130745] to-[#1a0a5e] hover:opacity-90 shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
