import React, { useState } from "react"
import { FaEllipsisH, FaHeart, FaPlus, FaStepBackward, FaStepForward, FaSyncAlt } from "react-icons/fa"

export default function Page() {
  // STATE FOR BUTTONS
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black gap-12">
      {/* Play/Pause Button */}
      <button
        className={`w-24 h-24 rounded-lg flex items-center justify-center mb-6 shadow-lg transition-all duration-150
          ${isPlaying ? "bg-[#3E2053]" : "bg-[#E84646]"}
        `}
        onClick={() => setIsPlaying((prev) => !prev)}
      >
        {isPlaying ? (
          // Pause icon (custom SVG)
          <svg width="56" height="56" viewBox="0 0 56 56">
            <rect x="14" y="12" width="10" height="32" rx="2" fill="#F15837" />
            <rect x="32" y="12" width="10" height="32" rx="2" fill="#F15837" />
          </svg>
        ) : (
          // Play icon
          <svg width="56" height="56" viewBox="0 0 56 56">
            <polygon points="18,12 44,28 18,44" fill="#3E2053" />
          </svg>
        )}
      </button>

      {/* Control Buttons Row */}
      <div className="flex gap-4">
        <ControlButton icon={<FaStepBackward />} />
        <ControlButton icon={<FaStepForward />} />
        <ControlButton icon={<FaPlus />} />
        {/* Up/Down Arrow Button */}
        <ControlButton
          icon={
            <svg width="32" height="32" viewBox="0 0 32 32">
              <polyline
                points="16,8 20,12 12,12"
                fill="none"
                stroke="#F15837"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="16,24 20,20 12,20"
                fill="none"
                stroke="#F15837"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        {/* Loop Button */}
        <ControlButton active={isLooping} onClick={() => setIsLooping((prev) => !prev)} icon={<FaSyncAlt />} />
        <ControlButton icon={<FaHeart />} />
        <ControlButton icon={<FaEllipsisH />} />
      </div>
    </div>
  )
}

// Button component with optional active state
function ControlButton({
  icon,
  active = false,
  onClick,
}: {
  icon: React.ReactNode
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      className={`
        w-16 h-16 rounded-md flex items-center justify-center
        ${active ? "bg-[#F15837]" : "bg-[#3E2053]"}
        text-[#F15837] text-3xl
        shadow-[0_4px_0_0_#F15837]
        hover:scale-105 transition-transform
        border-none outline-none
      `}
      onClick={onClick}
    >
      {icon}
    </button>
  )
}
