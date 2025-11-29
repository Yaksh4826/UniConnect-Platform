import React from 'react'

export const Button = ({name, onClick}) => {
  return (
    <button 
      onClick={onClick}
      className="
        w-48 h-12
        px-2 py-1 rounded-lg 
        text-white font-medium 
        bg-linear-to-r from-[#130745] to-[#1a0a5e]
        shadow-md

        transition-all duration-300 ease-in-out
        hover:scale-[1.03] hover:shadow-lg
        hover:from-[#0f0538] hover:to-[#15095a]
      "
    >{name}</button>
  )
}
