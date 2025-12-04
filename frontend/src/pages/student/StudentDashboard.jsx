import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Styles
import "../../styles/StudentDashboard.css";

// Icons
import lostFoundIcon from "../../assets/stats_lostfound.png";
import eventsIcon from "../../assets/stats_events.webp";
import marketplaceIcon from "../../assets/stats_marketplace.png";
import profileIcon from "../../assets/profile_icon.jpg";

export default function StudentDashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  // ========================================
  // REAL STATS
  // ========================================
  const [stats, setStats] = useState({
    lostfound: 0,
    events: 0,
    marketplace: 0,
  });

  // ========================================
  // RECENT ACTIVITY
  // ========================================
  const [recentEvents, setRecentEvents] = useState([]);
  const [recentLostFound, setRecentLostFound] = useState([]);
  const [recentMarketplace, setRecentMarketplace] = useState([]);

  // Helper navigation
  const go = (path) => navigate(path);

  // ========================================
  // FETCH ALL
  // ========================================
  useEffect(() => {
    const loadData = async () => {
      try {
        // LOST & FOUND
        const lfRes = await fetch("http://localhost:5000/api/lostfound", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const lfData = await lfRes.json();

        // EVENTS
        const evRes = await fetch("http://localhost:5000/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const evData = await evRes.json();

        // MARKETPLACE
        const mpRes = await fetch("http://localhost:5000/api/marketplace", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const mpData = await mpRes.json();

        // SET STATS
        setStats({
          lostfound: lfData.length,
          events: evData.length,
          marketplace: mpData.length,
        });

        // SET RECENT ACTIVITY (last 3)
        setRecentEvents(evData.slice(-3).reverse());
        setRecentLostFound(lfData.slice(-3).reverse());
        setRecentMarketplace(mpData.slice(-3).reverse());

      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    loadData();
  }, [token]);

  return (
    <div className="student-dashboard">

      {/* Banner */}
      <div className="student-banner">
        <h1>Welcome, {user?.fullName}</h1>
        <p>Your personalized student dashboard</p>
      </div>

      {/* ======== QUICK ACCESS CARDS ======== */}
      <div className="student-stats-grid">

        <div className="student-card" onClick={() => go("/lostFound")}>
          <img src={lostFoundIcon} alt="" />
          <h3>Lost & Found</h3>
          <p>{stats.lostfound} items reported</p>
        </div>

        <div className="student-card" onClick={() => go("/events")}>
          <img src={eventsIcon} alt="" />
          <h3>Campus Events</h3>
          <p>{stats.events} upcoming events</p>
        </div>

        <div className="student-card" onClick={() => go("/marketplace")}>
          <img src={marketplaceIcon} alt="" />
          <h3>Marketplace</h3>
          <p>{stats.marketplace} items listed</p>
        </div>

        <div className="student-card" onClick={() => go(`/profile/${user?._id}`)}>
          <img src={profileIcon} alt="" />
          <h3>Your Profile</h3>
          <p>Manage your information</p>
        </div>

      </div>

      {/* ======================================== */}
      {/* RECENT ACTIVITY SECTION */}
      {/* ======================================== */}
      <div className="recent-activity-section">
        <h2 className="recent-title">Recent Activity</h2>

        {/* GRID */}
        <div className="recent-grid">

          {/* Recent Events */}
          <div className="recent-box">
            <h3 className="recent-box-title">📅 Latest Events</h3>
            {recentEvents.length > 0 ? (
              recentEvents.map((ev) => (
                <div className="recent-item" key={ev._id}>
                  <h4>{ev.title}</h4>
                  <p>{ev.description.substring(0, 60)}...</p>
                  <span className="recent-date">
                    {ev.date ? new Date(ev.date).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              ))
            ) : (
              <p className="no-data">No events yet.</p>
            )}
          </div>

          {/* Recent Lost & Found */}
          <div className="recent-box">
            <h3 className="recent-box-title">🔍 Recent Lost & Found</h3>
            {recentLostFound.length > 0 ? (
              recentLostFound.map((item) => (
                <div className="recent-item" key={item._id}>
                  <h4>{item.itemName || item.title}</h4>
                  <p>{item.description.substring(0, 60)}...</p>
                  <span className="recent-date">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="no-data">No items yet.</p>
            )}
          </div>

          {/* Recent Marketplace */}
          <div className="recent-box">
            <h3 className="recent-box-title">🛒 Latest Marketplace Posts</h3>
            {recentMarketplace.length > 0 ? (
              recentMarketplace.map((mp) => (
                <div className="recent-item" key={mp._id}>
                  <h4>{mp.title}</h4>
                  <p>{mp.description.substring(0, 60)}...</p>
                  <span className="recent-date">
                    {new Date(mp.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="no-data">No marketplace items yet.</p>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
