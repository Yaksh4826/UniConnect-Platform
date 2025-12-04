import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/StaffLostFound.css";
import { useAuth } from "../../context/AuthContext";

export default function StaffLostFoundEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    status: "lost",
    location: "",
  });

  // Load existing LostFound Item
  useEffect(() => {
    fetch(`http://localhost:5000/api/lostfound/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          itemName: data.itemName,
          description: data.description,
          status: data.status,
          location: data.location,
        });
        setLoading(false);
      })
      .catch((err) => console.error("Error loading item:", err));
  }, [id, token]);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/lostfound/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Item updated successfully!");
        navigate("/staff/lostfound");
      } else {
        const err = await response.json();
        alert("Update failed: " + err.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  if (loading) return <p style={{ padding: "40px" }}>Loading item...</p>;

  return (
    <div className="staff-lf-container">
      <h1 className="staff-lf-title">Edit Lost & Found Item</h1>

      <div className="staff-lf-table-wrapper" style={{ maxWidth: "700px" }}>
        <form className="staff-edit-form" onSubmit={handleSubmit}>
          {/* Item Name */}
          <label className="staff-edit-label">Item Name</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="staff-edit-input"
            required
          />

          {/* Description */}
          <label className="staff-edit-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="staff-edit-textarea"
            required
          />

          {/* Status */}
          <label className="staff-edit-label">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="staff-edit-input"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
            <option value="resolved">Resolved</option>
          </select>

          {/* Location */}
          <label className="staff-edit-label">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="staff-edit-input"
            required
          />

          <button type="submit" className="staff-edit-save-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
