import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/StaffLostFound.css"; // reuse same form styles
import { useAuth } from "../../context/AuthContext";
import { FaSave } from "react-icons/fa";

export default function StaffEventsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  });

  // Load existing event
  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title,
          description: data.description,
          location: data.location,
          date: data.date?.slice(0, 16), // fix datetime-local input
        });

        setLoading(false);
      })
      .catch((err) => console.error("Error loading event:", err));
  }, [id, token]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${id}`,
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
        alert("Event updated successfully!");
        navigate("/staff/events");
      } else {
        const err = await response.json();
        alert("Update failed: " + err.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  if (loading) return <p style={{ padding: "40px" }}>Loading event...</p>;

  return (
    <div className="staff-lf-container">
      <h1 className="staff-lf-title">Edit Event</h1>

      <div className="staff-lf-table-wrapper" style={{ maxWidth: "700px" }}>
        <form className="staff-edit-form" onSubmit={handleSubmit}>

          <label className="staff-edit-label">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="staff-edit-input"
            required
          />

          <label className="staff-edit-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="staff-edit-textarea"
            required
          ></textarea>

          <label className="staff-edit-label">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="staff-edit-input"
            required
          />

          <label className="staff-edit-label">Date</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="staff-edit-input"
            required
          />

          <button className="staff-edit-save-btn" type="submit">
            <FaSave /> Save Changes
          </button>

        </form>
      </div>
    </div>
  );
}
