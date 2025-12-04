import React, { useEffect, useState } from "react";
import "../../styles/StaffLostFound.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function StaffLostFound() {
  const [items, setItems] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  // Fetch Lost & Found items
  useEffect(() => {
    fetch("http://localhost:5000/api/lostfound", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching staff lostfound:", err));
  }, [token]);

  // DELETE item
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/lostfound/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Item deleted successfully");
        setItems(items.filter((item) => item._id !== id));
      } else {
        const err = await res.json();
        alert("Error deleting: " + err.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="staff-lf-container">
      <h1 className="staff-lf-title">Manage Lost & Found</h1>

      <div className="staff-lf-table-wrapper">
        <table className="staff-lf-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Status</th>
              <th>Location</th>
              <th>Reported By</th>
              <th>Date</th>
              <th>Actions</th> {/* NEW */}
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-msg">
                  No Lost & Found items available.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id}>
                  <td>{item.itemName}</td>

                  <td className={item.status === "lost" ? "lost-text" : "found-text"}>
                    {item.status}
                  </td>

                  <td>{item.location}</td>

                  <td>{item.createdBy?.email || "Unknown"}</td>

                  <td>{new Date(item.createdAt).toLocaleString()}</td>

                  {/* ACTION BUTTONS */}
                  <td className="staff-actions-cell">
                    <button
                      className="staff-edit-btn"
                      onClick={() => navigate(`/staff/lostfound/edit/${item._id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="staff-delete-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
