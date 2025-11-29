import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { HiMenu, HiX } from "react-icons/hi";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <NavLink to="/discover" className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors">
            Discover
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
            <NavLink 
              to="/login" 
              className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors"
            >
              Login
            </NavLink>
            <NavLink 
              to="/register" 
              className="bg-linear-to-r from-[#110753] to-[#5B57C9] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Register
            </NavLink>
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
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg z-40 md:hidden">
          <div className="flex flex-col p-6 gap-4">
            <NavLink 
              to="/" 
              className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/discover" 
              className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Discover
            </NavLink>
            <NavLink 
              to="/lostFound" 
              className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Lost & Found
            </NavLink>
            <NavLink 
              to="/events" 
              className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </NavLink>
            <NavLink 
              to="/marketplace" 
              className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collaborate
            </NavLink>
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
              <NavLink 
                to="/login" 
                className="text-[#051133] font-medium hover:text-[#5B57C9] transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                className="bg-linear-to-r from-[#110753] to-[#5B57C9] text-white px-4 py-2 rounded-lg font-medium text-center hover:shadow-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
