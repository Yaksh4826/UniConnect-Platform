import React from 'react';
import { EventCard } from '../components/events/EventCard';

export const EventsPage = () => {
  // Sample event data - replace with actual data from your backend
  const events = [
    {
      id: 1,
      title: "Hack the Campus",
      date: "Nov 25, 6 PM",
      description: "Join the biggest student hackathon of the semester.",
      imageColor: "bg-gradient-to-br from-yellow-100 to-green-50"
    },
    {
      id: 2,
      title: "Career Connect",
      date: "Nov 27, 2 PM",
      description: "Meet recruiters, polish your resume, and explore internships.",
      imageColor: "bg-gradient-to-br from-green-100 via-yellow-50 to-purple-100"
    },
    {
      id: 3,
      title: "Open Mice",
      date: "Nov 30, 12:30 AM",
      description: "Showcase your talent or cheer for your friends.",
      imageColor: "bg-gradient-to-br from-pink-200 via-purple-100 to-teal-200"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-[#130745] mb-4">
            See what's Happening next week
          </h1>
          <p className="text-lg text-purple-600 font-medium">
            Stay in the loop with campus events, workshops, and meetups.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
