import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";



export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const { user, logout } = useAuth();
const navigate = useNavigate();

  return (
   <div className="sticky top-0 z-50 bg-[#F4F8FF]/70 backdrop-blur-lg shadow-md">
  <div className="flex justify-between items-center px-4 md:px-8 py-4 min-h-[60px]">
    {/* Logo + Nav */}
 <NavLink
          to="/"
          className="flex items-center justify-center text-2xl font-semibold space-x-2"
        >
          <img src={logo} alt="UniConnect Logo" className="h-10 w-auto" />
          <span className="text-[#051133]">UniConnect</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors">
            Home
          </NavLink>
          <NavLink to="/lostFound" className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors">
            Lost & Found
          </NavLink>
          <NavLink to="/events" className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors">
            Events
          </NavLink>
          <NavLink to="/marketplace" className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors">
            Collaborate
          </NavLink>
        <div className="flex items-center gap-3 ml-4">
  {!user && (
    <>
      <NavLink to="/login" className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors">
        Login
      </NavLink>
      <NavLink
        to="/register"
        className="bg-linear-to-r from-[#110753] to-[#5B57C9] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
      >
        Register
      </NavLink>
    </>
  )}

  {user && (
    <>
      <button
        onClick={() => navigate(`/profile/${user._id}`)}
        className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors"
      >
        {user.fullName}
      </button>
      <button
        onClick={logout}
        className="text-red-600 font-medium hover:bg-red-100 px-3 py-1 rounded-lg transition-colors"
      >
        Logout
      </button>
    </>
  )}
</div>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#051133] text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
    {/* Mobile Menu */}
{mobileMenuOpen && (
  <div className="fixed top-16 left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg z-40 md:hidden">
    <div className="flex flex-col p-6 gap-4">
      <NavLink to="/" className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
      <NavLink to="/lostFound" className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors" onClick={() => setMobileMenuOpen(false)}>Lost & Found</NavLink>
      <NavLink to="/events" className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors" onClick={() => setMobileMenuOpen(false)}>Events</NavLink>
      <NavLink to="/marketplace" className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors" onClick={() => setMobileMenuOpen(false)}>Collaborate</NavLink>

      <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
        {!user && (
          <>
            <NavLink to="/login" className="text-[#051133] font-medium hover:text-[#5B57C9] text-center" onClick={() => setMobileMenuOpen(false)}>Login</NavLink>
            <NavLink to="/register" className="bg-linear-to-r from-[#110753] to-[#5B57C9] text-white px-4 py-2 rounded-lg font-medium text-center hover:shadow-lg transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>Register</NavLink>
          </>
        )}
        {user && (
          <>
            <button
              onClick={() => { navigate(`/profile/${user._id}`); setMobileMenuOpen(false); }}
              className="text-[#051133] font-medium hover:text-[#5B57C9] text-center"
            >
              {user.fullName}
            </button>
            <button
              onClick={() => { logout(); setMobileMenuOpen(false); }}
              className="text-red-600 font-medium hover:bg-red-100 px-3 py-1 rounded-lg text-center"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
};
