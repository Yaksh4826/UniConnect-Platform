import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaSave } from "react-icons/fa";

// ✅ Using the same staff styling (correct file)
import "../../styles/StaffLostFound.css";

export default function StaffMarketplaceEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  // 🔹 Fetch marketplace item details
  useEffect(() => {
    fetch(`http://localhost:5000/api/marketplace/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title || "",
          description: data.description || "",
          price: data.price || "",
          image: data.image || "",
        });
        setLoading(false);
      })
      .catch((err) =>
        console.error("Error loading marketplace item:", err)
      );
  }, [id, token]);

  // 🔹 Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Submit updated item
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/marketplace/${id}`,
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
        alert("Marketplace item updated successfully!");
        navigate("/staff/marketplace");
      } else {
        const err = await response.json();
        alert("Update failed: " + err.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  if (loading)
    return <p style={{ padding: "40px" }}>Loading item...</p>;

  return (
    <div className="staff-lf-container">
      <h1 className="staff-lf-title">Edit Marketplace Item</h1>

      <div className="staff-lf-table-wrapper" style={{ maxWidth: "700px" }}>
        <form className="staff-edit-form" onSubmit={handleSubmit}>
          
          {/* Title */}
          <label className="staff-edit-label">Title</label>
          <input
            type="text"
            name="title"
            className="staff-edit-input"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* Description */}
          <label className="staff-edit-label">Description</label>
          <textarea
            name="description"
            className="staff-edit-textarea"
            value={formData.description}
            onChange={handleChange}
            required
          />

          {/* Price */}
          <label className="staff-edit-label">Price ($)</label>
          <input
            type="number"
            name="price"
            className="staff-edit-input"
            value={formData.price}
            onChange={handleChange}
            required
          />

          {/* Image */}
          <label className="staff-edit-label">Image URL (optional)</label>
          <input
            type="text"
            name="image"
            className="staff-edit-input"
            value={formData.image}
            onChange={handleChange}
          />

          <button type="submit" className="staff-edit-save-btn">
            <FaSave /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
