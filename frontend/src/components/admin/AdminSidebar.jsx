import React from "react";
import { NavLink } from "react-router-dom";
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
          <span className="icon">📊</span> Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="icon">👤</span> Users
        </NavLink>

        <NavLink
          to="/admin/events"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="icon">📅</span> Events
        </NavLink>

        <NavLink
          to="/admin/marketplace"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="icon">🛒</span> Marketplace
        </NavLink>

        <NavLink
          to="/admin/lostfound"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="icon">🔍</span> Lost & Found
        </NavLink>

      </nav>
    </div>
  );
}
