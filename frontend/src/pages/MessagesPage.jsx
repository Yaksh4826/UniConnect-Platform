import React, { useEffect, useRef, useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";

// Simple real-time messaging page using Socket.IO
export const MessagesPage = () => {
  const { user } = useAuth();
  const socketRef = useRef(null);

  const [recipientId, setRecipientId] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]); // {id, fromSelf, text, time, fromName, fromUserId}

  // Connect socket
  useEffect(() => {
    if (!user?._id) return;

    const socket = io("http://localhost:5000", {
      query: { userId: user._id },
    });
    socketRef.current = socket;

    socket.on("chat_message", ({ message, fromName, fromUserId }) => {
      setChatMessages((prev) => [
        {
          id: Date.now() + Math.random(),
          fromSelf: false,
          text: message,
          time: new Date().toLocaleTimeString(),
          fromName: fromName || "User",
          fromUserId,
        },
        ...prev,
      ]);
      // Auto-fill recipient if empty
      if (!recipientId) {
        setRecipientId(fromUserId);
        setRecipientName(fromName || "User");
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [user, recipientId]);

  const uniqueSenders = useMemo(() => {
    const map = new Map();
    chatMessages.forEach((m) => {
      if (!m.fromSelf && !map.has(m.fromUserId)) {
        map.set(m.fromUserId, m.fromName || "User");
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [chatMessages]);

  const sendMessage = () => {
    if (!recipientId.trim()) {
      alert("Please enter a recipient user ID.");
      return;
    }
    if (!chatInput.trim()) return;

    const payload = {
      toUserId: recipientId.trim(),
      message: chatInput.trim(),
      fromName: user?.fullName || "Me",
    };

    if (socketRef.current) {
      socketRef.current.emit("chat_message", payload);
    }

    setChatMessages((prev) => [
      {
        id: Date.now() + Math.random(),
        fromSelf: true,
        text: chatInput.trim(),
        time: new Date().toLocaleTimeString(),
        fromName: user?.fullName || "Me",
        fromUserId: user?._id,
      },
      ...prev,
    ]);

    setChatInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white border rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-[#130745] mb-4">Messages</h1>

        {/* Recipient selector */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Recipient User ID
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#130745]"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              placeholder="Enter seller/buyer user ID"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Recipient Name (optional)
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#130745]"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Display name"
            />
          </div>
        </div>

        {uniqueSenders.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-semibold text-gray-700 mb-2">Recent senders</div>
            <div className="flex flex-wrap gap-2">
              {uniqueSenders.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setRecipientId(s.id);
                    setRecipientName(s.name);
                  }}
                  className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-100 text-xs hover:bg-blue-100"
                >
                  {s.name} ({s.id})
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col border rounded-xl p-3 bg-gray-50">
            <div className="flex-1 overflow-y-auto space-y-2">
              {chatMessages.length === 0 ? (
                <p className="text-sm text-gray-500">No messages yet.</p>
              ) : (
                chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-lg text-sm ${
                      msg.fromSelf
                        ? "bg-green-50 border border-green-100 self-end"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <div className="text-[11px] text-gray-500 mb-1">
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
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-[#130745] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all"
              >
                Send
              </button>
            </div>
          </div>

          <div className="w-full md:w-72 border rounded-xl p-3 bg-white">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Current Chat</h3>
            <p className="text-xs text-gray-600">
              User: {recipientName || "N/A"}
              <br />
              ID: {recipientId || "N/A"}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Start typing to send real-time messages to the selected user (they must be online).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

