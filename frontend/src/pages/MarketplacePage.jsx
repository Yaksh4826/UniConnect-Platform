import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export const MarketplacePage = () => {
  const { user, token } = useAuth(); // ⭐ Needed to attach postedBy
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  // ============================
  // FETCH ALL ITEMS
  // ============================
  useEffect(() => {
    fetch("http://localhost:5000/api/marketplace")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ============================
  // CREATE ITEM
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert("Please login to create items.");

    const body = {
      ...formData,
      postedBy: user.id, // ⭐ VERY IMPORTANT
    };

    try {
      const res = await fetch("http://localhost:5000/api/marketplace", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        alert("Error creating item");
        return;
      }

      const newItem = await res.json();
      setItems([...items, newItem]); // ⭐ Add instantly

      alert("Item created!");

      setFormData({ title: "", description: "", price: "", image: "" });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="p-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-extrabold text-[#130745]">Marketplace</h2>

        {user && (
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#130745] to-[#1a0a5e] text-white rounded-lg font-semibold hover:scale-[1.03] transition-shadow"
          >
            Add Item
          </button>
        )}
      </div>

      {/* ITEMS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="p-4 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-[#130745]">{item.title}</h3>
            <p className="text-gray-700 mt-2">{item.description}</p>
            <p className="mt-2 font-semibold">Price: ${item.price}</p>
          </div>
        ))}
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-lg w-full relative">
            <button
              className="absolute top-3 right-3 font-bold text-xl"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>

            <h2 className="text-3xl font-extrabold text-[#130745] mb-6 text-center">
              Add Marketplace Item
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border px-4 py-3 rounded-lg"
                required
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Description"
                className="w-full border px-4 py-3 rounded-lg"
                required
              />

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border px-4 py-3 rounded-lg"
                required
              />

              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full border px-4 py-3 rounded-lg"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-[#130745] to-[#1a0a5e]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
