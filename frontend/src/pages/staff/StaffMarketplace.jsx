import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/StaffLostFound.css";
import { useAuth } from "../../context/AuthContext";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function StaffMarketplace() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuth();

  // Load marketplace data
  useEffect(() => {
    fetch("http://localhost:5000/api/marketplace", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Marketplace error:", err));
  }, [token]);

  // Delete item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/marketplace/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setItems(items.filter((i) => i._id !== id));
        alert("Marketplace item deleted.");
      } else {
        alert("Delete failed.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="staff-lf-container">
      <h1 className="staff-lf-title">Manage Marketplace</h1>
      <p className="staff-subtitle">
        Review, edit, or delete marketplace posts submitted by students.
      </p>

      <div className="staff-lf-table-wrapper">
        <table className="staff-lf-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Seller</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>{item.seller?.email || "Unknown"}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>

                  <td className="staff-actions-cell">
                    <button
                      className="staff-edit-btn"
                      onClick={() =>
                        navigate(`/staff/marketplace/edit/${item._id}`)
                      }
                    >
                      <FaEdit /> Edit
                    </button>

                    <button
                      className="staff-delete-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-msg">
                  No marketplace items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
