import React from 'react';

export const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Abstract Background Image */}
      <div className={`h-48 ${event.imageColor} relative`}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#130745] mb-2">
          {event.title} - {event.date}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {event.description}
        </p>
        <a 
          href={`/events/${event.id}`} 
          className="text-[#130745] font-medium hover:text-purple-600 transition-colors inline-flex items-center gap-1"
        >
          See the Event →
        </a>
      </div>
    </div>
  );
};

