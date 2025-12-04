import React, { useEffect, useState, useRef, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";

export const MarketplacePage = () => {
  const { user, token } = useAuth(); // ⭐ Needed to attach postedBy
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [chatRecipient, setChatRecipient] = useState(null); // { id, name }
  const [chatMessages, setChatMessages] = useState([]); // { id, fromSelf, text, time, fromName }
  const [chatInput, setChatInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const socketRef = useRef(null);

  // ============================
  // FETCH ALL ITEMS
  // ============================
  useEffect(() => {
    let isMounted = true;
    fetch("http://localhost:5000/api/marketplace")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // ============================
  // SOCKET.IO SETUP
  // ============================
  useEffect(() => {
    if (!user?._id) return;

    // Connect to socket.io with userId for identification
    const socket = io("http://localhost:5000", {
      query: { userId: user._id },
    });
    socketRef.current = socket;

    // Listen for buy notifications
    socket.on("buy_notification", ({ itemTitle, buyerName }) => {
      setNotifications((prev) => [
        {
          id: Date.now(),
          itemTitle,
          buyerName: buyerName || "A buyer",
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    });

    // Listen for chat messages
    socket.on("chat_message", ({ message, fromName, fromUserId }) => {
      setChatMessages((prev) => [
        {
          id: Date.now(),
          fromSelf: false,
          text: message,
          time: new Date().toLocaleTimeString(),
          fromName: fromName || "User",
          fromUserId,
        },
        ...prev,
      ]);
      // Auto-set recipient to sender if not set
      if (!chatRecipient) {
        setChatRecipient({ id: fromUserId, name: fromName || "User" });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [user?._id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ============================
  // CREATE ITEM
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to create items.");
      return;
    }

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

  // ============================
  // BUY ITEM HANDLER
  // ============================
  const handleBuy = (item) => {
    if (!user) {
      alert("Please login to buy items.");
      return;
    }
    const sellerId = item.postedBy?._id || item.postedBy;
    if (sellerId === user._id) {
      alert("You cannot buy your own item.");
      return;
    }
    
    // In a real app, this would redirect to payment gateway or chat
    const confirmBuy = window.confirm(`Do you want to buy "${item.title}" for $${item.price}? \n\nThis will notify the seller.`);
    if (confirmBuy) {
      // Emit socket event to notify seller if online
      if (socketRef.current) {
        socketRef.current.emit("buy_request", {
          sellerId,
          itemTitle: item.title,
          buyerName: user.fullName || "Buyer",
        });
      }
      alert("Purchase request sent to seller!");
    }
  };

  // ============================
  // CHAT HANDLERS
  // ============================
  const startChatWithSeller = (item) => {
    if (!user) {
      alert("Please login to message sellers.");
      return;
    }
    const sellerId = item.postedBy?._id || item.postedBy;
    const sellerName = item.postedBy?.fullName || "Seller";
    setChatRecipient({ id: sellerId, name: sellerName });
    // Optional: seed a friendly message
    setChatInput(`Hi, I'm interested in "${item.title}".`);
  };

  const sendChatMessage = () => {
    if (!user) {
      alert("Please login to send messages.");
      return;
    }
    if (!chatRecipient) {
      alert("Select a seller first.");
      return;
    }
    if (!chatInput.trim()) return;

    const payload = {
      toUserId: chatRecipient.id,
      message: chatInput.trim(),
      fromName: user?.fullName || "Buyer",
    };

    // Emit via socket
    if (socketRef.current) {
      socketRef.current.emit("chat_message", payload);
    }

    // Add to local chat
    setChatMessages((prev) => [
      {
        id: Date.now(),
        fromSelf: true,
        text: chatInput.trim(),
        time: new Date().toLocaleTimeString(),
        fromName: user?.fullName || "Me",
      },
      ...prev,
    ]);

    setChatInput("");
  };

  // Memoize rendered items to avoid re-renders on chat changes
  const renderedItems = useMemo(
    () =>
      items.map((item) => (
        <div
          key={item._id || item.id || item.title}
          className="p-4 border rounded-xl shadow hover:shadow-lg transition bg-white flex flex-col h-full"
        >
          {/* Image */}
          {item.image && (
            <div className="w-full h-48 mb-4 overflow-hidden rounded-md bg-gray-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          <h3 className="text-xl font-bold text-[#130745]">{item.title}</h3>
          <p className="text-gray-700 mt-2 flex-grow">{item.description}</p>
          <p className="mt-4 font-bold text-lg text-green-600">${item.price}</p>

          <button
            onClick={() => handleBuy(item)}
            className="mt-4 w-full py-2 rounded-lg bg-[#130745] text-white font-semibold hover:opacity-90 transition-all"
          >
            Buy Now
          </button>

          <button
            onClick={() => startChatWithSeller(item)}
            className="mt-2 w-full py-2 rounded-lg bg-gray-100 text-[#130745] font-semibold hover:bg-gray-200 transition-all border"
          >
            Message Seller
          </button>
        </div>
      )),
    [items]
  );

  return (
    <div
      className="p-12 min-h-screen bg-gradient-to-br from-[#f0f4ff] via-white to-[#eaf7ff]"
    >
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

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* ITEMS LIST */}
        <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-gray-500 py-10">Loading items...</div>
          ) : (
            renderedItems
          )}
        </div>

        {/* MESSAGE PANEL */}
        <div className="bg-white border rounded-xl shadow p-4 h-full max-h-[70vh] flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-[#130745]">Messages</h3>
            <button
              className="text-sm text-red-500 hover:underline"
              onClick={() => {
                setNotifications([]);
                setChatMessages([]);
              }}
            >
              Clear
            </button>
          </div>

          {/* Notifications List */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Purchase Requests</h4>
            <div className="max-h-32 overflow-y-auto space-y-2">
              {notifications.length === 0 ? (
                <p className="text-xs text-gray-500">No purchase requests yet.</p>
              ) : (
                notifications.map((notif) => (
                  <div key={notif.id} className="p-3 rounded-lg bg-blue-50 border border-blue-100 text-sm text-blue-900">
                    <div className="font-semibold">{notif.itemTitle}</div>
                    <div className="text-xs text-blue-700">From: {notif.buyerName}</div>
                    <div className="text-[11px] text-gray-500 mt-1">{notif.time}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Section */}
          <div className="flex-1 flex flex-col">
            <div className="mb-2 text-sm text-gray-600">
              {chatRecipient ? (
                <>
                  Chatting with <span className="font-semibold text-[#130745]">{chatRecipient.name}</span>
                </>
              ) : (
                "Select a seller to start chat."
              )}
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 border rounded-lg p-3 bg-gray-50">
              {chatMessages.length === 0 ? (
                <p className="text-xs text-gray-500">No chat messages yet.</p>
              ) : (
                chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-2 rounded-lg text-sm ${msg.fromSelf ? "bg-green-50 border border-green-100 self-end" : "bg-white border border-gray-200"}`}
                  >
                    <div className="text-[11px] text-gray-500 mb-0.5">
                      {msg.fromSelf ? "You" : msg.fromName} · {msg.time}
                    </div>
                    <div className="text-gray-800">{msg.text}</div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-grow border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#130745]"
                placeholder={chatRecipient ? "Type a message..." : "Select a seller first"}
              />
              <button
                onClick={sendChatMessage}
                className="px-4 py-2 bg-[#130745] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all"
              >
                Send
              </button>
            </div>
          </div>
        </div>
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
