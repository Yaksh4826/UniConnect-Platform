import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const EventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", date: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Event created!");
        setFormData({ title: "", description: "", date: "" });
        setShowForm(false);
        const updated = await res.json();
        setEvents([...events, updated]);
      } else alert("Error creating event");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="p-12">
      {/* Header + Create Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-extrabold text-[#130745]">Events</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-gradient-to-r from-[#130745] to-[#1a0a5e] text-white rounded-lg font-semibold hover:scale-[1.03] transition-shadow"
        >
          Create Event
        </button>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="p-4 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-[#130745]">{event.title}</h3>
            <p className="text-gray-700 mt-2">{event.description}</p>
            <p className="mt-2 font-semibold">Date: {new Date(event.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {/* Form Modal */}
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
              Create Event
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#130745]"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                rows={4}
                className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#130745]"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#130745]"
                required
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-[#130745] to-[#1a0a5e] hover:opacity-90 shadow-md"
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
