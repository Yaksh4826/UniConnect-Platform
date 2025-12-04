import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const LostItemForm = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth(); // ✔ get user + token

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    status: "lost",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ⭐ SAFER createdBy — supports id or _id from AuthContext
    const payload = {
      ...formData,
      createdBy: user?.id || user?._id,
    };

    try {
      const response = await fetch("http://localhost:5000/api/lostfound", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✔ send token
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        alert("Error submitting form: " + (errData.message || "Unknown error"));
        return;
      }

      alert("Lost/Found item created successfully!");
      navigate("/lostFound");

    } catch (error) {
      console.error("Submit error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl border border-gray-200">

        <h2 className="text-3xl font-extrabold text-center text-[#130745] mb-6">
          Create Lost & Found Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-lg">

          {/* Item Name */}
          <div>
            <label className="block font-semibold mb-1">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
              className="w-full border px-4 py-3 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#130745]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border px-4 py-3 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#130745]"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block font-semibold mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg bg-gray-50 
                         focus:outline-none focus:ring-2 focus:ring-[#130745]"
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border px-4 py-3 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#130745]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold text-lg 
                       bg-gradient-to-r from-[#130745] to-[#1a0a5e] 
                       hover:opacity-90 mt-4 shadow-md"
          >
            Submit
          </button>
        </form>

      </div>
    </div>
  );
};
