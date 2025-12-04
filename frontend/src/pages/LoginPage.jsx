import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  // -------------------------------
  // HANDLE INPUT CHANGE
  // -------------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -------------------------------
  // HANDLE LOGIN SUBMIT
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚀 Attempt login using AuthContext
    const success = await login(formData.email, formData.password);
    if (!success) return;

    // ✔ Get the fresh user stored by AuthContext
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    // ⭐ EXTRA SAFETY CHECK
    if (!loggedInUser || !loggedInUser._id) {
      alert("Login failed: No user data returned.");
      return;
    }

    // -------------------------------
    // 🚀 CHECK SELECTED ROLE VS ACTUAL ROLE
    // -------------------------------
    if (loggedInUser.role !== formData.role) {
      alert(`Error: You are trying to login as "${formData.role}", but your account is "${loggedInUser.role}".`);
      logout(); // Log them out immediately
      return;
    }

    // -------------------------------
    // 🚀 ROLE-BASED REDIRECTION (FIXED)
    // -------------------------------
    if (loggedInUser.role === "admin") {
      navigate("/admin/dashboard");
      return;
    }

    if (loggedInUser.role === "student") {
      navigate("/student/dashboard");
      return;
    }

    if (loggedInUser.role === "staff") {
      navigate("/staff/dashboard");
      return;
    }

    // DEFAULT → Profile page
    navigate(`/profile/${loggedInUser._id}`);
  };

  // -------------------------------
  // RENDER UI
  // -------------------------------
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-[#EEF2FF] via-white to-[#E0EAFF] px-4 py-10">
      <div className="w-full max-w-xl bg-white p-12 md:p-14 rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#130745] mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-7 text-lg">
          
          {/* Role Selection */}
          <div className="space-y-2">
            <label className="block font-semibold">Login As</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#130745]"
            >
              <option value="student">User (Student)</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border px-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#130745]"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border px-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#130745]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-[#130745] to-[#1a0a5e] hover:opacity-90 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};
