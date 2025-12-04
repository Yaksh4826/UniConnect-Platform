import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAdmin, isStudent, isStaff } = useAuth();
  const navigate = useNavigate();

  // Prevent /profile/undefined
  const goProfile = () => {
    if (!user?._id) return;
    navigate(`/profile/${user._id}`);
  };

  return (
    <div className="sticky top-0 z-50 bg-[#F4F8FF]/70 backdrop-blur-lg shadow-md">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 min-height-[60px]">

        {/* LOGO */}
        <NavLink
          to="/"
          className="flex items-center justify-center text-2xl font-semibold space-x-2"
        >
          <img src={logo} alt="UniConnect Logo" className="h-10 w-auto" />
          <span className="text-[#051133]">UniConnect</span>
        </NavLink>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">

          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/lostFound" className="nav-link">Lost & Found</NavLink>
          <NavLink to="/events" className="nav-link">Events</NavLink>
          <NavLink to="/marketplace" className="nav-link">Marketplace</NavLink>
          {user && <NavLink to="/messages" className="nav-link">Messages</NavLink>}

          {/* STUDENT DASHBOARD */}
          {isStudent() && (
            <NavLink
              to="/student/dashboard"
              className="nav-link font-semibold text-[#4747d1]"
            >
              Student Dashboard
            </NavLink>
          )}

          {/* STAFF DASHBOARD */}
          {isStaff() && (
            <NavLink
              to="/staff/dashboard"
              className="nav-link font-semibold text-[#008080]"
            >
              Staff Dashboard
            </NavLink>
          )}

          {/* ADMIN DASHBOARD */}
          {isAdmin() && (
            <NavLink
              to="/admin/dashboard"
              className="nav-link font-semibold text-[#5a21c9]"
            >
              Admin Dashboard
            </NavLink>
          )}

          {/* USER CONTROLS */}
          <div className="flex items-center gap-3 ml-4">

            {/* NOT LOGGED IN */}
            {!user && (
              <>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="bg-gradient-to-r from-[#110753] to-[#5B57C9]
                  text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg
                  transition-all duration-300 hover:scale-105"
                >
                  Register
                </NavLink>
              </>
            )}

            {/* LOGGED IN */}
            {user && (
              <>
                {/* Show First Name */}
                <button
                  onClick={goProfile}
                  className="text-[#051133] font-medium hover:underline"
                >
                  {user.fullName.split(" ")[0]}
                </button>

                <button
                  onClick={() => {
                    logout();
                    navigate("/login"); // prevent dashboard from showing
                  }}
                  className="text-red-600 font-medium hover:bg-red-100 
                  px-3 py-1 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden text-[#051133] text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* ======================================
                MOBILE MENU
      ======================================= */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white/95 shadow-lg z-40 md:hidden">
          <div className="flex flex-col p-6 gap-4">

            <NavLink to="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
            <NavLink to="/lostFound" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Lost & Found</NavLink>
            <NavLink to="/events" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Events</NavLink>
            <NavLink to="/marketplace" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Marketplace</NavLink>
            {user && <NavLink to="/messages" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Messages</NavLink>}

            {isStudent() && (
              <NavLink
                to="/student/dashboard"
                className="mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Student Dashboard
              </NavLink>
            )}

            {isStaff() && (
              <NavLink
                to="/staff/dashboard"
                className="mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Staff Dashboard
              </NavLink>
            )}

            {isAdmin() && (
              <NavLink
                to="/admin/dashboard"
                className="mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Dashboard
              </NavLink>
            )}

            {/* AUTH ACTIONS */}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">

              {!user && (
                <>
                  <NavLink
                    to="/login"
                    className="mobile-link text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    className="bg-gradient-to-r from-[#110753] to-[#5B57C9]
                    text-white px-4 py-2 rounded-lg font-medium text-center
                    hover:shadow-lg transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </NavLink>
                </>
              )}

              {user && (
                <>
                  <button
                    onClick={() => {
                      goProfile();
                      setMobileMenuOpen(false);
                    }}
                    className="mobile-link text-center"
                  >
                    {user.fullName}
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      navigate("/login");
                    }}
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
