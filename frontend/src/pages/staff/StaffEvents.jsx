import React, { useEffect, useState } from "react";
import "../../styles/StaffEvents.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function StaffEvents() {
  const [events, setEvents] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  // Fetch events
  useEffect(() => {
    fetch("http://localhost:5000/api/events", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, [token]);

  // Delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setEvents(events.filter((ev) => ev._id !== id));
        alert("Event deleted successfully!");
      } else {
        alert("Delete failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="staff-events-container">
      <h1 className="staff-events-title">Manage Events</h1>

      <div className="staff-events-table-wrapper">
        <table className="staff-events-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Date</th>
              <th>Posted By</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.length > 0 ? (
              events.map((ev) => (
                <tr key={ev._id}>
                  <td>{ev.title}</td>
                  <td>{ev.location}</td>
                  <td>{new Date(ev.date).toLocaleString()}</td>
                  <td>{ev.createdBy?.email || "Unknown"}</td>

                  <td className="staff-action-buttons">
                    <button
                      className="staff-edit-btn"
                      onClick={() => navigate(`/staff/events/edit/${ev._id}`)}
                    >
                      <FaEdit /> Edit
                    </button>

                    <button
                      className="staff-delete-btn"
                      onClick={() => handleDelete(ev._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-msg">
                  No events available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
