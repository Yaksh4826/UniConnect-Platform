import React from 'react'

export const NormalButton = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        w-48 h-12
        px-2 py-1
        rounded-lg font-medium
        bg-white text-[#130745] 
        border border-[#130745] shadow-md

        transition-all duration-300 ease-in-out
        hover:shadow-lg
        hover:bg-[#130745]
        hover:text-white
        hover:scale-[1.03]
      "
    >
      {name}
    </button>
  );
};
