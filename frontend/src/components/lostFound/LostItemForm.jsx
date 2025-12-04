import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UploadDropzone } from "@bytescale/upload-widget-react";
import { useEffect } from "react";

export const LostItemForm = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  useEffect(() => {
    if (!user) {
      alert("Please login to create lost/found items.");
      navigate("/login");
    }
  }, [user, navigate]);


  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    type: "lost", // Default
    status: "available", // Default workflow status
    location: "",
    category: "other",
    image: "",
    contactInfo: "",
  });

  // BYTESCALE OPTIONS
  // NOTE: "free" API key is for demo/testing. 
  // Files deleted after 24h. Replace with your real key in production.
  const options = {
    apiKey: "free", // or your public_... key
    maxFileCount: 1,
    showFinishButton: true,
    editor: { images: { crop: false } },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (files) => {
    if (files.length > 0) {
      const fileUrl = files[0].fileUrl;
      setFormData({ ...formData, image: fileUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      createdBy: user?.id || user?._id,
    };

    try {
      const response = await fetch("http://localhost:5000/api/lostfound", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        alert("Error submitting form: " + (errData.message || "Unknown error"));
        return;
      }

      alert("Item reported successfully!");
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
          Report Lost or Found Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-lg">

          {/* Type Selection */}
          <div>
            <label className="block font-semibold mb-1">I am reporting a...</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#130745]"
            >
              <option value="lost">Lost Item (I lost something)</option>
              <option value="found">Found Item (I found something)</option>
            </select>
          </div>

          {/* Item Name */}
          <div>
            <label className="block font-semibold mb-1">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
              placeholder="e.g. Blue Backpack"
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#130745]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#130745]"
            >
              <option value="other">Other</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="keys">Keys</option>
              <option value="wallet">Wallet</option>
              <option value="books">Books</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Detailed description of the item..."
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#130745]"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-1">Location {formData.type === 'lost' ? 'Lost' : 'Found'}</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g. Library 2nd Floor"
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#130745]"
            />
          </div>

          {/* Image Upload (Bytescale) */}
          <div>
            <label className="block font-semibold mb-2">Upload Image (Optional)</label>
            
            {formData.image ? (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-300">
                <img 
                  src={formData.image} 
                  alt="Uploaded" 
                  className="w-full h-full object-cover" 
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: "" })}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow hover:bg-red-700"
                  title="Remove Image"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="h-64 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                <UploadDropzone
                  options={options}
                  onUpdate={({ uploadedFiles }) => handleImageUpload(uploadedFiles)}
                  width="100%"
                  height="100%"
                />
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <label className="block font-semibold mb-1">Contact Info</label>
            <input
              type="text"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              required
              placeholder="Phone number or Email"
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#130745]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-[#130745] to-[#1a0a5e] hover:opacity-90 mt-4 shadow-md"
          >
            Submit Report
          </button>
        </form>

      </div>
    </div>
  );
};
