import React, { memo } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaMapMarkerAlt, FaCalendarAlt, FaTag, FaPhone, FaCheckCircle } from "react-icons/fa";

const LostItemCard = memo(({ item, onClaim }) => {
  const { user } = useAuth();

  // Helper to get color based on type
  const isLost = item.type === "lost";
  const badgeColor = isLost ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600";
  const borderColor = isLost ? "border-l-4 border-red-500" : "border-l-4 border-green-500";

  return (
    <div className={`bg-white block max-w-sm p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow ${borderColor} flex flex-col h-full`}>
      
      {/* Image (if exists) */}
      {item.image ? (
        <div className="w-full h-48 mb-4 overflow-hidden rounded-md bg-gray-100">
          <img 
            src={item.image} 
            alt={item.itemName} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
            loading="lazy" 
          />
        </div>
      ) : (
        <div className="w-full h-48 mb-4 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
           <span className="text-sm">No Image</span>
        </div>
      )}

      <div className="flex justify-between items-start mb-2">
        <h5 className="text-xl font-bold tracking-tight text-[#130745] line-clamp-1" title={item.itemName}>
          {item.itemName}
        </h5>
        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${badgeColor}`}>
          {item.type}
        </span>
      </div>

      <p className="text-gray-500 text-sm mb-2 font-medium flex items-center gap-2">
        <FaMapMarkerAlt className="text-red-400" /> {item.location}
      </p>

      <p className="text-gray-700 text-sm mb-4 flex-grow line-clamp-3">
        {item.description}
      </p>

      <div className="mt-auto pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-2">
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-blue-400" /> 
          {new Date(item.date).toLocaleDateString()}
        </p>
        
        <p className="flex items-center gap-2 capitalize">
          <FaTag className="text-yellow-500" /> 
          {item.category || "Other"}
        </p>
        
        {item.contactInfo && (
          <p className="flex items-center gap-2 text-gray-700 font-medium">
            <FaPhone className="text-green-500" /> {item.contactInfo}
          </p>
        )}
      </div>

      {/* Claim Button (Only for Found items, visible to others) */}
      {item.type === "found" && item.status === "available" && user?._id !== item.createdBy?._id && (
        <button 
          onClick={() => onClaim(item._id)}
          className="mt-4 w-full py-2.5 rounded-lg bg-[#130745] text-white font-medium hover:opacity-90 transition-all active:scale-95 text-sm shadow-sm"
        >
          Claim This Item
        </button>
      )}

       {/* Status Badge if claimed */}
       {item.status === "claimed" && (
          <div className="mt-4 w-full py-2 rounded-lg bg-green-50 text-green-700 border border-green-200 font-bold text-center text-sm flex justify-center items-center gap-2">
            <FaCheckCircle /> Claimed / Resolved
          </div>
       )}
    </div>
  );
});

export default LostItemCard;