import React, { useState } from "react"
import { FaEllipsisH, FaHeart, FaPlus, FaStepBackward, FaStepForward, FaSyncAlt } from "react-icons/fa"

export default function Page() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isHearted, setIsHearted] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black gap-12">
      <button
        className={`w-24 h-24 rounded-lg flex items-center justify-center mb-6 shadow-lg transition-all duration-150
          ${isPlaying ? "bg-[#3E2053]" : "bg-[#E84646]"}
        `}
        onClick={() => setIsPlaying((prev) => !prev)}
      >
        {isPlaying ? (
          <svg width="56" height="56" viewBox="0 0 56 56">
            <rect x="14" y="12" width="10" height="32" rx="2" fill="#F15837" />
            <rect x="32" y="12" width="10" height="32" rx="2" fill="#F15837" />
          </svg>
        ) : (
          <svg width="56" height="56" viewBox="0 0 56 56">
            <polygon points="18,12 44,28 18,44" fill="#3E2053" />
          </svg>
        )}
      </button>

      <div className="flex gap-4">
        <ControlButton icon={<FaStepBackward />} />
        <ControlButton icon={<FaStepForward />} />
        <ControlButton icon={<FaPlus />} />
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
        <ControlButton
          toggled={isLooping}
          onClick={() => setIsLooping((prev) => !prev)}
          icon={<FaSyncAlt />}
          color="#F15837"
        />
        <ControlButton
          toggled={isHearted}
          onClick={() => setIsHearted((prev) => !prev)}
          icon={<FaHeart />}
          color="#F15837"
        />
        <ControlButton icon={<FaEllipsisH />} />
      </div>
    </div>
  )
}

type ControlButtonProps = {
  icon: React.ReactNode
  toggled?: boolean
  onClick?: () => void
  color?: string
}

function ControlButton({ icon, toggled = false, onClick, color = "#F15837" }: ControlButtonProps) {
  const PURPLE = "#3E2053"
  const ORANGE = color
  const bgColor = toggled ? ORANGE : PURPLE
  const underlineColor = toggled ? PURPLE : ORANGE

  return (
    <button
      className={`
        w-16 h-16 rounded-md flex flex-col items-center justify-center relative
        transition-all duration-150
        border-none outline-none
        hover:scale-105
        focus:ring-2 focus:ring-offset-2 focus:ring-[#E84646]
      `}
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      <span className="text-3xl" style={{ color: ORANGE }}>
        {icon}
      </span>
      <span
        className="absolute bottom-0 left-1 right-1 h-2 rounded-b-md transition-colors duration-150"
        style={{ backgroundColor: underlineColor }}
      />
    </button>
  )
}
