import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",   // default
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await register(
      formData.fullName,
      formData.email,
      formData.password,
      formData.role
    );

    if (!success) return;

    // 🔥 After register, user must login again (your backend requires login)
    alert("Registration successful! Please login.");

    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-[#130745] mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-lg">
          
          {/* Full Name */}
          <div>
            <label className="block font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#130745]"
            />
          </div>

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

          {/* Role */}
          <div>
            <label className="block font-semibold mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#130745]"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-[#130745] to-[#1a0a5e] hover:opacity-90 mt-4 shadow-md"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};
