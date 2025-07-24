import React from "react"

interface FullScreenPlayerProps {
  isOpen: boolean
  onClose: () => void
}

const FullScreenPlayer: React.FC<FullScreenPlayerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const handleOverlayClick = () => {
    onClose()
  }

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20"
    >
      <div
        onClick={stopPropagation}
        className="rounded-xl shadow-xl w-[90vw] h-[85vh] bg-gradient p-10 relative flex flex-col max-w-screen-xl"
      >
        {/* Modal Content */}
        <div className="text-white flex flex-col justify-between flex-1">
          {/* Song Info */}
          <div>
            <h2 className="text-4xl font-bold text-[var(--color-secondary)]">Title – ARTIST</h2>
            <p className="text-lg text-gray-100 mt-1">Album – Year</p>

            {/* Up Next */}
            <div className="mt-8 space-y-4 text-base">
              {[1, 2].map((n) => (
                <div className="flex items-center space-x-3" key={n}>
                  <img src="/assets/logo.png" className="w-8 h-8 rounded" />
                  <div>
                    <div>Title – ARTIST</div>
                    <div className="text-xs text-gray-300">Album – Year</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-end space-x-3 mt-10">
            {[
              { label: "⏮️", action: "prev" },
              { label: "⏪", action: "rewind" },
              { label: "▶️", action: "play" },
              { label: "⏩", action: "forward" },
              { label: "⏭️", action: "next" },
              { label: "❤️", action: "like" },
              { label: "🔁", action: "repeat" },
            ].map((btn, i) => (
              <button
                key={i}
                title={btn.action}
                className="w-12 h-12 flex items-center justify-center text-2xl bg-[var(--color-primary)] text-[var(--color-secondary)] hover:bg-[var(--color-accent)] border-2 border-black rounded-sm"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullScreenPlayer
