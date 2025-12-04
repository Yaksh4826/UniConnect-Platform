import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import "../../styles/AdminLayout.css";
import "../../styles/AdminMarketplace.css";
import { useAuth } from "../../context/AuthContext";

export default function AdminMarketplace() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);

  // EDIT MODAL STATE
  const [editItem, setEditItem] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  // Load Marketplace Items
  useEffect(() => {
    fetch("http://localhost:5000/api/marketplace", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching marketplace:", err));
  }, [token]);

  // ============================
  // DELETE ITEM
  // ============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this marketplace item?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/marketplace/${id}`, {
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

  // ============================
  // OPEN EDIT MODAL
  // ============================
  const handleEdit = (item) => {
    setEditItem(item);
    setEditForm({
      title: item.title,
      description: item.description,
      price: item.price,
    });
  };

  // ============================
  // SAVE EDITS
  // ============================
  const handleSaveEdit = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/marketplace/${editItem._id}`,
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

      // Update table instantly
      setItems((prev) =>
        prev.map((i) => (i._id === updated._id ? updated : i))
      );

      alert("Item updated successfully!");

      // Close modal
      setEditItem(null);
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  // Update form fields
  const handleChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1 className="admin-page-title">Marketplace Management</h1>
        <p className="admin-page-subtitle">
          View and manage items listed in Marketplace.
        </p>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Price ($)</th>
                <th>Posted By</th>
                <th>Date</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.price || "0"}</td>
                    <td>{item.postedBy?.fullName || "Unknown"}</td>
                    <td>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit /> Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No marketplace items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =============================== */}
        {/* EDIT MODAL */}
        {/* =============================== */}
        {editItem && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Edit Marketplace Item</h2>

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

                <label>Price ($)</label>
                <input
                  name="price"
                  type="number"
                  value={editForm.price}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-actions">
                <button className="save-btn" onClick={handleSaveEdit}>
                  <FaSave /> Save
                </button>

                <button className="cancel-btn" onClick={() => setEditItem(null)}>
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
