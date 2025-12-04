// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Central place for API base
const API_BASE = "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Restore login from localStorage
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // ============================================================
  // Persist USER changes
  // ============================================================
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Persist TOKEN changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Auth header helper
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  // ============================================================
  // REGISTER
  // ============================================================
  const register = async (fullName, email, password, role) => {
    try {
      const res = await axios.post(`${API_BASE}/users/register`, {
        fullName,
        email,
        password,
        role,
      });

      alert("Registration successful! Please login now.");
      return true;
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed!");
      return false;
    }
  };

  // ============================================================
  // LOGIN
  // ============================================================
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE}/users/login`, {
        email,
        password,
      });

      const { user: loggedInUser, token: jwtToken } = res.data;

      setUser(loggedInUser);
      setToken(jwtToken);

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("token", jwtToken);

      return true;
    } catch (err) {
      alert(err.response?.data?.message || "Login failed!");
      return false;
    }
  };

  // ============================================================
  // LOGOUT  (FIXED ✔ FULL RESET + REDIRECT)
  // ============================================================
  const logout = () => {
    // Remove from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear React states
    setUser(null);
    setToken("");

    // Redirect
    navigate("/login");
  };

  // ============================================================
  // HELPER FUNCTIONS
  // ============================================================
  const isLoggedIn = () => !!user;
  const isAdmin = () => user?.role === "admin";
  const isStaff = () => user?.role === "staff";
  const isStudent = () => user?.role === "student";

  // Always give correct Mongo user id
  const userId = user?._id || null;

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        token,
        authHeaders,
        login,
        register,
        logout,
        isLoggedIn,
        isAdmin,
        isStaff,
        isStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
