import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Persist user on page reload
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // REGISTER
  const register = async (fullName, email, password, role) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        fullName,
        email,
        password,
        role,
      });
      alert("Registered! Please login now.");
      return true;
    } catch (err) {
      console.error("Register Error:", err.response || err);
      alert(err.response?.data?.message || err.message || "Something went wrong!");
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return true;
    } catch (err) {
      console.error("Login Error:", err.response || err);
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
