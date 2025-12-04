import React, { useState, useEffect } from "react";
import handshakeImage from "../assets/handshake.svg";   // ✅ FIXED
import { Button } from "../components/commonComponents/GradientButton";
import { NormalButton } from "../components/commonComponents/NormalButton";
import { useNavigate } from "react-router-dom";
import { TbMoodSmile } from "react-icons/tb";
import { FiBox } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";
import bgImage from "../assets/gradient_BG.png";

export const HomePage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const cardData = [
    {
      icon: <TbMoodSmile size={32} className="text-orange-700" />,
      title: "Discover Opportunities",
      description:
        "Explore campus events, clubs, and projects tailored to your interests. Never miss what's happening around you.",
    },
    {
      icon: <FiBox size={32} className="text-blue-900" />,
      title: "Lost & Found",
      description:
        "Misplaced something? Found a stray item? Help each other out with our campus-wide lost & found board.",
    },
    {
      icon: <HiUserGroup size={32} className="text-green-700" />,
      title: "Collaborate & Grow",
      description:
        "Connect with peers to build, brainstorm, and launch ideas. From study groups to startups, it starts here.",
    },
  ];

  // Fetch events from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched events:", data);
        // Only take first 3 events
        setEvents(data.slice(0, 3));
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div
        className="flex flex-col items-center justify-center min-h-screen pt-20 gap-6 text-center bg-cover bg-center bg-no-repeat rounded-b-[10px]"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h1 className="text-6xl md:text-7xl font-extrabold text-[#130745]">
          Connect. <br /> Collaborate. <br /> Discover.
        </h1>

        <img
          src={handshakeImage}
          alt="Handshake"
          className="h-24 w-24 my-4 brightness-0 saturate-100 hue-rotate-230 contrast-95"
        />

        <p className="text-[#4a5568] text-lg font-medium">
          All within campus. <br /> Collaborate and help each other grow.
        </p>

        <div className="flex gap-4 mt-4">
          <Button name="Marketplace" onClick={() => navigate("/marketplace")} />
          <NormalButton
            name="Events"
            onClick={() => navigate("/events")}
          />
        </div>
      </div>

      {/* WHY UNICONNECT */}
      <div className="w-full flex flex-col items-center py-20 bg-white gap-12">
        <h2 className="text-4xl font-extrabold text-[#130745] w-full max-w-[1150px]">
          Why UniConnect?
        </h2>

        <div className="flex flex-row gap-8 justify-center items-start w-full max-w-[1150px]">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-neutral-primary-soft max-w-sm p-6 border border-gray-300 rounded-lg shadow-xs gap-4 hover:scale-[1.03] transition-all"
            >
              <div className="flex flex-row items-center gap-4">
                {card.icon}
                <h5 className="text-lg font-semibold">{card.title}</h5>
              </div>

              <p className="text-body">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* UPCOMING EVENTS */}
      <div className="bg-blue-50 w-full flex flex-col items-center py-20 gap-12">
        <h2 className="text-5xl font-extrabold text-[#130745]">
          See what's happening next week
        </h2>

        <p className="text-lg font-medium text-[#4d4b57]">
          Stay in the loop with campus events, workshops, and meetups.
        </p>

        <div className="flex flex-row gap-8 justify-center items-start w-full max-w-[1150px]">
          {events.map((event, id) => (
            <div
              key={id}
              className="bg-neutral-primary-soft flex flex-col max-w-sm p-6 border border-gray-300 rounded-lg shadow-lg gap-4"
            >
              <h5 className="text-2xl font-semibold">{event.title}</h5>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-neutral-primary-soft border border-gray-300 rounded-lg shadow-lg m-4">
        <div className="w-full mx-auto max-w-screen p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-body">
            © 2025 <a href="/">UniConnect</a>. All Rights Reserved.
          </span>
          <ul className="flex gap-4 items-center text-sm font-medium text-body">
            <li>
              <a href="/events" className="hover:underline">
                Events
              </a>
            </li>
            <li>
              <a href="/lostFound" className="hover:underline">
                Lost & Found
              </a>
            </li>
            <li>
              <a href="/marketplace" className="hover:underline">
                Marketplace
              </a>
            </li>
            <li>
              <a href="/register" className="hover:underline">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};
