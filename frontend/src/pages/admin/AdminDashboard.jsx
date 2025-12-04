import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import AdminSidebar from "../../components/admin/AdminSidebar";

// Styles
import "../../styles/AdminDashboard.css";
import "../../styles/AdminLayout.css";

// Images
import adminBanner from "../../assets/admin_banner.jpg";
import usersIcon from "../../assets/stats_users.png";
import eventsIcon from "../../assets/stats_events.webp";
import marketplaceIcon from "../../assets/stats_marketplace.png";
import lostfoundIcon from "../../assets/stats_lostfound.png";

export default function AdminDashboard() {
  const { user, token } = useAuth();

  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    marketplace: 0,
    lostfound: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/overview", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // Safety fallback if backend misses fields
        setStats({
          users: data.users || 0,
          events: data.events || 0,
          marketplace: data.marketplace || 0,
          lostfound: data.lostfound || 0,
        });
      })
      .catch((err) => console.error("Error fetching stats:", err));
  }, [token]);

  return (
    <div className="admin-layout">
      {/* LEFT SIDEBAR */}
      <AdminSidebar />

      {/* RIGHT CONTENT */}
      <div className="admin-content">

        {/* Banner */}
        <div className="admin-banner">
          <img src={adminBanner} alt="Admin Banner" />
          <h1>Admin Dashboard</h1>
        </div>

        {/* Welcome */}
        <div className="admin-welcome">
          <h2>Welcome, {user?.fullName || "Admin"}</h2>
          <p>Manage users, events, marketplace items, and lost & found reports.</p>
        </div>

        {/* Stats Section */}
        <div className="admin-stats-grid">

          <div className="admin-stat-card">
            <img src={usersIcon} alt="Users" />
            <h3>Total Users</h3>
            <p>{stats.users}</p>
          </div>

          <div className="admin-stat-card">
            <img src={eventsIcon} alt="Events" />
            <h3>Total Events</h3>
            <p>{stats.events}</p>
          </div>

          <div className="admin-stat-card">
            <img src={marketplaceIcon} alt="Marketplace" />
            <h3>Marketplace Items</h3>
            <p>{stats.marketplace}</p>
          </div>

          <div className="admin-stat-card">
            <img src={lostfoundIcon} alt="Lost & Found" />
            <h3>Lost & Found</h3>
            <p>{stats.lostfound}</p>
          </div>

        </div>
      </div>
    </div>
  );
}
