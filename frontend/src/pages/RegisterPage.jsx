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
    role: "student", // Default role
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
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-[#EEF2FF] via-white to-[#E0EAFF] px-4 py-10">
      <div className="w-full max-w-xl bg-white p-12 md:p-14 rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#130745] mb-8">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-7 text-lg">
          
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block font-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border px-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#130745]"
            />
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
            Register
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500">
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
