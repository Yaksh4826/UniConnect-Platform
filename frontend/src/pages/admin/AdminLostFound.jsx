import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import "../../styles/AdminLayout.css";
import "../../styles/AdminLostFound.css";
import { useAuth } from "../../context/AuthContext";

export default function AdminLostFound() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);

  // EDIT MODAL STATE
  const [editItem, setEditItem] = useState(null);
  const [editForm, setEditForm] = useState({
    itemName: "",
    description: "",
    location: "",
    status: "pending",
  });

  // ================================
  // FETCH LOST & FOUND ITEMS
  // ================================
  useEffect(() => {
    fetch("http://localhost:5000/api/lostfound", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching lost & found:", err));
  }, [token]);

  // ================================
  // DELETE LOST ITEM
  // ================================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this lost & found item?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/lostfound/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setItems(items.filter((item) => item._id !== id));
        alert("Item deleted.");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  // ================================
  // OPEN EDIT MODAL
  // ================================
  const handleEdit = (item) => {
    setEditItem(item);
    setEditForm({
      itemName: item.itemName || item.title || "",
      description: item.description || "",
      location: item.location || "",
      status: item.status || "pending",
    });
  };

  // ================================
  // SAVE EDIT
  // ================================
  const handleSaveEdit = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/lostfound/${editItem._id}`,
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

      // update UI instantly
      setItems((prev) =>
        prev.map((i) => (i._id === updated._id ? updated : i))
      );

      alert("Lost & Found updated successfully!");
      setEditItem(null);
    } catch (err) {
      console.error("Error updating lost item:", err);
    }
  };

  const handleChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">

        <h1 className="admin-page-title">Lost & Found Management</h1>
        <p className="admin-page-subtitle">
          Review and manage lost & found reports submitted by students.
        </p>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Status</th>
                <th>Reported By</th>
                <th>Date</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.itemName || item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.location || "Not provided"}</td>
                    <td className="status-cell">{item.status || "pending"}</td>
                    <td>{item.reportedBy?.fullName || "Unknown"}</td>
                    <td>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="action-buttons">
                      <button className="edit-btn" onClick={() => handleEdit(item)}>
                        ✏️ Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item._id)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No lost & found items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ==================================== */}
        {/* EDIT MODAL */}
        {/* ==================================== */}
        {editItem && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Edit Lost & Found Item</h2>

              <div className="modal-form">
                <label>Item Name</label>
                <input
                  name="itemName"
                  value={editForm.itemName}
                  onChange={handleChange}
                />

                <label>Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={editForm.description}
                  onChange={handleChange}
                />

                <label>Location</label>
                <input
                  name="location"
                  value={editForm.location}
                  onChange={handleChange}
                />

                <label>Status</label>
                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <div className="modal-actions">
                <button className="save-btn" onClick={handleSaveEdit}>
                  💾 Save
                </button>

                <button className="cancel-btn" onClick={() => setEditItem(null)}>
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
