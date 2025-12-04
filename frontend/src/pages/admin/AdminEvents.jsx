import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import "../../styles/AdminLayout.css";
import "../../styles/AdminEvents.css";
import { useAuth } from "../../context/AuthContext";

export default function AdminEvents() {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);

  // EDIT MODAL STATE
  const [editEvent, setEditEvent] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  // ================================
  // FETCH EVENTS
  // ================================
  useEffect(() => {
    fetch("http://localhost:5000/api/events", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, [token]);

  // ================================
  // DELETE EVENT
  // ================================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this event?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setEvents(events.filter((ev) => ev._id !== id));
        alert("Event deleted.");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  // ================================
  // OPEN EDIT MODAL
  // ================================
  const handleEdit = (ev) => {
    setEditEvent(ev);
    setEditForm({
      title: ev.title,
      description: ev.description,
      date: ev.date ? ev.date.substring(0, 16) : "",
      location: ev.location || "",
    });
  };

  // ================================
  // SAVE EDIT
  // ================================
  const handleSaveEdit = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/events/${editEvent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();

      // Update UI
      setEvents((prev) =>
        prev.map((e) => (e._id === updated._id ? updated : e))
      );

      alert("Event updated successfully!");
      setEditEvent(null);
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  const handleChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1 className="admin-page-title">Events Management</h1>
        <p className="admin-page-subtitle">View and manage all campus events.</p>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Event Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Location</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {events.length > 0 ? (
                events.map((ev) => (
                  <tr key={ev._id}>
                    <td>{ev.title}</td>
                    <td>{ev.description}</td>
                    <td>
                      {ev.date
                        ? new Date(ev.date).toLocaleString()
                        : "N/A"}
                    </td>
                    <td>{ev.location || "N/A"}</td>

                    <td className="action-buttons">
                      <button className="edit-btn" onClick={() => handleEdit(ev)}>
                        ✏️ Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(ev._id)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =============================== */}
        {/* EDIT MODAL */}
        {/* =============================== */}
        {editEvent && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Edit Event</h2>

              <div className="modal-form">
                <label>Title</label>
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleChange}
                />

                <label>Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={editForm.description}
                  onChange={handleChange}
                />

                <label>Date & Time</label>
                <input
                  name="date"
                  type="datetime-local"
                  value={editForm.date}
                  onChange={handleChange}
                />

                <label>Location</label>
                <input
                  name="location"
                  value={editForm.location}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-actions">
                <button className="save-btn" onClick={handleSaveEdit}>
                  💾 Save
                </button>
                <button className="cancel-btn" onClick={() => setEditEvent(null)}>
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
