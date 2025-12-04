// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// ✅ Central place for API base (easy to change later)
const API_BASE = "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
  // Try to restore from localStorage on first load
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // ============================================================
  // Persist user + token on reload
  // ============================================================
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Small helper if you ever need auth headers
  const authHeaders = token
    ? { Authorization: `Bearer ${token}` }
    : {};

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

      console.log("REGISTER RESPONSE:", res.data);
      alert("Registered: Please login now.");
      return true;
    } catch (err) {
      console.error("Register Error:", err.response || err);
      alert(
        err.response?.data?.message ||
          err.message ||
          "Registration failed!"
      );
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

      // ⭐ VERY IMPORTANT: user includes _id, fullName, email, role
      setUser(loggedInUser);
      setToken(jwtToken);

      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("token", jwtToken);

      return true;
    } catch (err) {
      console.error("Login Error:", err.response || err);
      alert(err.response?.data?.message || "Login failed!");
      return false;
    }
  };

  // ============================================================
  // LOGOUT
  // ============================================================
  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // ============================================================
  // HELPER FUNCTIONS
  // ============================================================
  const isLoggedIn = () => !!user;
  const isAdmin = () => user?.role === "admin";
  const isStaff = () => user?.role === "staff";
  const isStudent = () => user?.role === "student";

  // Convenient userId helper (always uses Mongo _id)
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
