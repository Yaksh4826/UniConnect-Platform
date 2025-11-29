import React, { useState } from "react";
import handshakeImage from "../../public/handshake.svg";
import { Button } from "../components/commonComponents/GradientButton";
import { NormalButton } from "../components/commonComponents/NormalButton";
import { useNavigate } from "react-router-dom";
import { TbMoodSmile } from "react-icons/tb";
import { FiBox } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";
import { useEffect } from "react";
import bgImage from '../assets/gradient_BG.png'


export const HomePage = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      icon: <TbMoodSmile size={32} className="text-orange-700" />,
      title: "Discover Opportunities",
      description:
        "Explore campus events, clubs, and projects tailored to your interests. Never miss what's happening around you.",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: <FiBox size={32} className="text-blue-900" />,
      title: "Lost & Found",
      description:
        "Misplaced something? Found a stray item? Help each other out with our campus-wide lost & found board.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: <HiUserGroup size={32} className="text-green-700" />,
      title: "Collaborate & Grow",
      description:
        "Connect with peers to build, brainstorm, and launch ideas. From study groups to startups, it starts here.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

const[events , setEvents] = useState([])

  useEffect(() => {
    // Calling the backend API for the events 
    fetch("http://localhost:5000/api/events") // adjust to your backend URL
      .then((res) => res.json())
      .then((data) =>{  console.log("Fetched events:", data);
  setEvents(data);
})
      .catch((err) => console.error("Error fetching cards:", err));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div> 
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 gap-6 text-center bg-cover  bg-center bg-no-repeat rounded-b-[10px]" style={{ backgroundImage: `url(${bgImage})` }}>
        <h1 className="text-6xl md:text-7xl font-extrabold text-[#130745]">
          Connect. <br /> Collaborate. <br /> Discover.
        </h1>

        <img
          src={handshakeImage}
          alt="Handshake"
          className="h-24 w-24 my-4 brightness-0 saturate-100 hue-rotate-230 contrast-95"
        />

        <p className="text-[#4a5568] text-lg font-medium">
          All within campus. <br /> Collaborate and Help to grow each other.
        </p>

        <div className="flex gap-4 mt-4">
          <Button name="Discover" onClick={() => navigate("/discover")} />
          <NormalButton
            name="Collaborate"
            onClick={() => navigate("/marketplace")}
          />
        </div>
      </div>

      {/* Why UniConnect Section */}
{/* Why UniConnect Section */}
<div className="w-full flex flex-col items-center py-20 bg-white gap-12 h-7/12">
  <h2 className="text-4xl font-extrabold text-[#130745] mb-16 w-full max-w-[1150px]">
    Why UniConnect?
  </h2>

  {/* Cards Grid */}
 {/* Cards Grid */}
<div className="flex flex-row gap-8 justify-center items-start w-full max-w-[1150px]">
  {cardData.map((card, idx) => (
   
<div class="flex flex-col bg-neutral-primary-soft  max-w-sm p-6 border border-default rounded-lg shadow-xs gap-4 transition-all duration-300 ease-in-out
        hover:scale-[1.03] hover:shadow-lg">
    <div className="flex flex-row items-center gap-4">
      {card.icon}
      <h5 class="mb-3 text-lg font-semibold tracking-tight text-heading leading-8">{card.title}</h5>

   </div>
   
    <p class="text-body mb-6">{card.description}</p>
   
</div>

  ))}
</div>
</div>







<div className="HomePageEvents bg-blue-50">

<div className="w-full flex flex-col items-center py-20 bg-white gap-12 h-7/12">
  <h2 className="text-5xl font-extrabold text-[#130745] mb-16 w-full max-w-[1150px]">
    See what's happening next week
  </h2>
  <h2 className="text-lg font-medium text-[#4d4b57] mb-16 w-full max-w-[1150px]">
Stay in the loop with campus events, workshops, and meetups.
  </h2>

  {/* Cards Grid */}
 {/* Cards Grid */}
<div className="flex flex-row gap-8 justify-center items-start w-full max-w-[1150px]">
  {events.map((event, id) => (
   


<div class="bg-neutral-primary-soft flex flex-col max-w-sm p-6 border-gray-300 border rounded-lg  shadow-lg gap-4" key={id}>
  
        <img class="rounded-base" src="https://www.focuseventphotography.com/wp-content/uploads/2019/12/corporate-events-photographer-mirage-las-vegas.jpg" alt="" />


        <h5 class="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">{event.title}</h5>
  
    <p class="mb-6 text-body">{event.description}</p>
  
</div>

  ))}
</div>
</div>




</div>







{/* Footer section */}


<div className="footer">


<footer class="bg-neutral-primary-soft  border-gray-300 border rounded-lg  shadow-lg m-4">
    <div class="w-full mx-auto max-w-screen p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-body sm:text-center">© 2025 <a href="/" class="hover:underline">UniConnect</a>. All Rights Reserved.
    </span>
    <ul class="flex gap-4 items-center mt-3 text-sm font-medium text-body sm:mt-0">
        <li>
            <a href="/events" class="hover:underline me-4 md:me-6">Events</a>
        </li>
        <li>
            <a href="/lostFound" class="hover:underline me-4 md:me-6">Lost & Found</a>
        </li>
        <li>
            <a href="/marketplace" class="hover:underline me-4 md:me-6">Marketplace</a>
        </li>
        <li>
            <a href="/register" class="hover:underline">Sign Up</a>
        </li>
    </ul>
    </div>
</footer>

  
</div>


</div>
    </>
  );
};








