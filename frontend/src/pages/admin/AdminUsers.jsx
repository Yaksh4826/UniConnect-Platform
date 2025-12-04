import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import "../../styles/AdminLayout.css";
import "../../styles/AdminUsers.css";
import { useAuth } from "../../context/AuthContext";

export default function AdminUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);

  // EDIT MODAL STATE
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    role: "student",
  });

  // CREATE MODAL STATE
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
  });

  // ================================
  // FETCH USERS
  // ================================
  useEffect(() => {
    fetch("http://localhost:5000/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, [token]);

  // ================================
  // DELETE USER
  // ================================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setUsers(users.filter((u) => u._id !== id));
        alert("User deleted successfully.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // ================================
  // OPEN EDIT MODAL
  // ================================
  const handleEdit = (user) => {
    setEditUser(user);
    setEditForm({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  };

  const handleEditChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  // ================================
  // SAVE EDITED USER
  // ================================
  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${editUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();

      setUsers((prev) =>
        prev.map((u) => (u._id === updated._id ? updated : u))
      );

      alert("User updated successfully!");
      setEditUser(null);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // ================================
  // HANDLE CREATE USER
  // ================================
  const handleCreateChange = (e) =>
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });

  const handleCreateUser = async () => {
    if (!createForm.fullName || !createForm.email || !createForm.password) {
      return alert("All fields are required.");
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(createForm),
      });

      if (!res.ok) throw new Error("Create failed");

      const newUser = await res.json();

      setUsers((prev) => [...prev, newUser.user]);
      alert("User created successfully!");

      setShowCreateModal(false);
      setCreateForm({
        fullName: "",
        email: "",
        password: "",
        role: "student",
      });

    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1 className="admin-page-title">Users Management</h1>
        <p className="admin-page-subtitle">View and manage all registered users.</p>

        {/* CREATE BUTTON */}
        <button
          className="create-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <FaPlus /> Create New User
        </button>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.fullName}</td>
                    <td>{u.email}</td>
                    <td className="role-cell">{u.role}</td>
                    <td>{new Date(u.createdAt).toLocaleString()}</td>

                    <td className="action-buttons">
                      <button className="edit-btn" onClick={() => handleEdit(u)}>
                        <FaEdit /> Edit
                      </button>

                      <button className="delete-btn" onClick={() => handleDelete(u._id)}>
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">No users found.</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* =============================== */}
        {/* EDIT USER MODAL (FIXED – NOW FULLY EDITABLE) */}
        {/* =============================== */}
        {editUser && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Edit User</h2>

              <div className="modal-form">

                <label>Full Name</label>
                <input
                  name="fullName"
                  value={editForm.fullName}
                  onChange={handleEditChange}
                />

                <label>Email</label>
                <input
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                />

                <label>Role</label>
                <select
                  name="role"
                  value={editForm.role}
                  onChange={handleEditChange}
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              <div className="modal-actions">
                <button className="save-btn" onClick={handleSaveEdit}><FaSave /> Save</button>
                <button className="cancel-btn" onClick={() => setEditUser(null)}><FaTimes /> Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* =============================== */}
        {/* CREATE USER MODAL */}
        {/* =============================== */}
        {showCreateModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Create New User</h2>

              <div className="modal-form">
                <label>Full Name</label>
                <input
                  name="fullName"
                  value={createForm.fullName}
                  onChange={handleCreateChange}
                />

                <label>Email</label>
                <input
                  name="email"
                  value={createForm.email}
                  onChange={handleCreateChange}
                />

                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={createForm.password}
                  onChange={handleCreateChange}
                />

                <label>Role</label>
                <select
                  name="role"
                  value={createForm.role}
                  onChange={handleCreateChange}
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              <div className="modal-actions">
                <button className="save-btn" onClick={handleCreateUser}><FaSave /> Create</button>
                <button className="cancel-btn" onClick={() => setShowCreateModal(false)}><FaTimes /> Close</button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
