import React, { useEffect, useState } from "react";
import "../../styles/staffDashboard.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function StaffDashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalLost: 0,
    totalFound: 0,
    totalResolved: 0,
  });

  const [recentItems, setRecentItems] = useState([]);

  // ============================
  // LOAD STATS + RECENT ACTIVITY
  // ============================
  useEffect(() => {
    fetch("http://localhost:5000/api/lostfound", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setRecentItems(data.slice(0, 6)); // latest 6 items

        const lost = data.filter((i) => i.status === "lost").length;
        const found = data.filter((i) => i.status === "found").length;
        const resolved = data.filter((i) => i.status === "resolved").length;

        setStats({
          totalLost: lost,
          totalFound: found,
          totalResolved: resolved,
        });
      })
      .catch((err) => console.error("Error loading staff stats:", err));
  }, [token]);

  return (
    <div className="staff-dashboard-container">
      <h1 className="staff-dashboard-title">Staff Dashboard</h1>
      <p className="staff-dashboard-subtitle">
        Manage university Lost & Found, Events, and Marketplace submissions.
      </p>

      {/* ============================
          STAT CARDS
      ============================ */}
      <div className="staff-stats-row">
        <div className="staff-stat-card">
          <div className="staff-stat-number">{stats.totalLost}</div>
          <div className="staff-stat-label">Lost Items</div>
        </div>

        <div className="staff-stat-card">
          <div className="staff-stat-number">{stats.totalFound}</div>
          <div className="staff-stat-label">Found Items</div>
        </div>

        <div className="staff-stat-card">
          <div className="staff-stat-number">{stats.totalResolved}</div>
          <div className="staff-stat-label">Resolved Items</div>
        </div>
      </div>

      {/* ============================
          QUICK LINK CARDS
      ============================ */}
      <div className="staff-quick-links">
        <h2 className="staff-section-title">Quick Management</h2>

        <div className="staff-links-grid">
          <div
            className="staff-link-card"
            onClick={() => navigate("/staff/lostfound")}
          >
            <div className="staff-link-title">Manage Lost & Found</div>
            <div className="staff-link-desc">
              Update status, verify reports, and review submissions.
            </div>
          </div>

          <div
            className="staff-link-card"
            onClick={() => navigate("/staff/events")}
          >
            <div className="staff-link-title">Manage Events</div>
            <div className="staff-link-desc">
              Approve, edit, or delete event submissions.
            </div>
          </div>

          <div
            className="staff-link-card"
            onClick={() => navigate("/staff/marketplace")}
          >
            <div className="staff-link-title">Manage Marketplace</div>
            <div className="staff-link-desc">
              Moderate marketplace posts posted by students.
            </div>
          </div>
        </div>
      </div>

      {/* ============================
          RECENT ACTIVITY TABLE
      ============================ */}
      <h2 className="staff-section-title">Recent Lost & Found Activity</h2>

      <div className="staff-table-container">
        <table className="staff-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Status</th>
              <th>Location</th>
              <th>Reported By</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {recentItems.length > 0 ? (
              recentItems.map((i) => (
                <tr key={i._id}>
                  <td>{i.itemName}</td>
                  <td className={`activity-status-${i.status}`}>
                    {i.status}
                  </td>
                  <td>{i.location}</td>
                  <td>{i.createdBy?.email || "Unknown"}</td>
                  <td>{new Date(i.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No activity found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
