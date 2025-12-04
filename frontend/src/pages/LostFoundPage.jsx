import React, { useEffect, useState, useCallback } from "react";
import LostItemCard from "../components/lostFound/LostItemCard";
import { Button } from "../components/commonComponents/GradientButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSearch } from "react-icons/fa";
import { API_BASE_URL } from "../config";

export const LostFoundPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useAuth();

  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    search: "",
  });

  const fetchItems = useCallback((currentFilters) => {
    setLoading(true);

    const queryParams = new URLSearchParams();
    if (currentFilters.type !== "all")
      queryParams.append("type", currentFilters.type);
    if (currentFilters.category !== "all")
      queryParams.append("category", currentFilters.category);
    if (currentFilters.search)
      queryParams.append("search", currentFilters.search);

    fetch(`${API_BASE_URL}/api/lostfound?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cards:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchItems(filters);
    }, 500); // Debounce search by 500ms

    return () => clearTimeout(timer);
  }, [filters, fetchItems]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClaim = useCallback(
    async (id) => {
      if (!token) {
        alert("Please login to claim items.");
        navigate("/login");
        return;
      }

      if (
        !window.confirm(
          "Are you sure you want to claim this item? This will mark it as found/returned."
        )
      )
        return;

      try {
        const res = await fetch(
          `${API_BASE_URL}/api/lostfound/${id}/claim`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.ok) {
          alert("Item successfully claimed!");
          fetchItems(filters);
        } else {
          alert("Failed to claim item.");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [token, navigate, filters, fetchItems]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7ff] via-white to-[#e9f5ff] p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-[#130745]">
              Lost &amp; Found
            </h2>
            <p className="text-gray-500 mt-2">
              Report lost items or find what you've been looking for.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              name={"➕ Report Item"}
              onClick={() => navigate("/lostFound/create")}
            />
          </div>
        </div>

        {/* FILTERS & SEARCH BAR */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-grow w-full md:w-auto">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="search"
              placeholder="Search by name, location, description..."
              value={filters.search}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#130745] focus:outline-none"
            />
          </div>

          {/* Type Filter */}
          <div className="w-full md:w-48">
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#130745] focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="lost">Lost Items</option>
              <option value="found">Found Items</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-48">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#130745] focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="keys">Keys</option>
              <option value="wallet">Wallet</option>
              <option value="books">Books</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* GRID */}
        {loading ? (
          <p className="text-center text-gray-500">Loading items...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.length > 0 ? (
              items.map((item) => (
                <LostItemCard
                  key={item._id}
                  item={item}
                  onClaim={handleClaim}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-xl text-gray-400 font-medium">
                  No items match your filters.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
