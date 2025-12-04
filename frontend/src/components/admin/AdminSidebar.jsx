import React from "react";
import { NavLink } from "react-router-dom";
import { FaChartPie, FaUsers, FaCalendarAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import "../../styles/AdminSidebar.css";

export default function AdminSidebar() {
  return (
    <div className="admin-sidebar">

      {/* TITLE */}
      <h2 className="sidebar-title">Admin Panel</h2>

      {/* NAVIGATION */}
      <nav className="sidebar-nav">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="icon"><FaChartPie /></span> Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="icon"><FaUsers /></span> Users
        </NavLink>

        <NavLink
          to="/admin/events"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="icon"><FaCalendarAlt /></span> Events
        </NavLink>

        <NavLink
          to="/admin/marketplace"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="icon"><FaShoppingCart /></span> Marketplace
        </NavLink>

        <NavLink
          to="/admin/lostfound"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="icon"><FaSearch /></span> Lost & Found
        </NavLink>

      </nav>
    </div>
  );
}
