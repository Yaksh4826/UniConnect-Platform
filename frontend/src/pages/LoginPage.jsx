import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-[#130745] mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-lg">
          
          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#130745]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#130745]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-[#130745] to-[#1a0a5e] hover:opacity-90 mt-4 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
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
