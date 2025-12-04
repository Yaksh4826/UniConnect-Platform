import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MyMarketplacePosts() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // ================================
  // FETCH MY Marketplace POSTS
  // ================================
  useEffect(() => {
    if (!user?._id) return;

    fetch(`http://localhost:5000/api/marketplace/user/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching my marketplace posts:", err));
  }, [user, token]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">

      {/* Page Header */}
      <h1 className="text-4xl font-extrabold text-[#130745] mb-3">
        My Marketplace Posts
      </h1>
      <p className="text-gray-600 text-lg mb-10">
        View and manage all items you have listed.
      </p>

      {/* If no posts */}
      {posts.length === 0 && (
        <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-3xl text-center">
          <p className="text-gray-500 text-lg mb-6">
            You haven’t posted anything yet.
          </p>

          <button
            onClick={() => navigate("/marketplace/create")}
            className="px-6 py-3 bg-[#130745] text-white rounded-xl font-semibold hover:opacity-90"
          >
            + Create Your First Post
          </button>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {posts.map((p) => (
          <div
            key={p._id}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
          >
            <h3 className="text-2xl font-bold text-[#130745] mb-2">{p.title}</h3>
            <p className="text-gray-600 mb-3">{p.description}</p>

            <p className="font-semibold text-blue-600 mb-4">
              Price: ${p.price}
            </p>

            <p className="text-sm text-gray-400">
              Posted: {new Date(p.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-5 flex gap-4">
              <button
                onClick={() => navigate(`/marketplace/edit/${p._id}`)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                ✏️ Edit
              </button>

              <button
                onClick={() => navigate(`/marketplace/${p._id}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                🔍 View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
