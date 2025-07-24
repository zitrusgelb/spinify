import React from "react"

interface FullScreenPlayerProps {
  isOpen: boolean
  onClose: () => void
}

const FullScreenPlayer: React.FC<FullScreenPlayerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="rounded-xl shadow-xl w-[700px] h-[400px] bg-gradient p-6 relative flex flex-col">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-white text-2xl hover:text-gray-300">
          ✕
        </button>

        {/* Song Info + Up Next */}
        <div className="text-white flex flex-col justify-between flex-1">
          {/* Song Title + Album Info */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-secondary)]">Title – ARTIST</h2>
            <p className="text-sm text-gray-100">Album – Year</p>

            {/* Up Next */}
            <div className="mt-6 space-y-3 text-sm">
              {[1, 2].map((n) => (
                <div className="flex items-center space-x-2" key={n}>
                  <img src="/assets/logo.png" className="w-6 h-6 rounded" />
                  <div>
                    <div>Title – ARTIST</div>
                    <div className="text-xs text-gray-300">Album – Year</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-end space-x-2 mt-8">
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
                className="w-10 h-10 flex items-center justify-center text-xl bg-[var(--color-primary)] text-[var(--color-secondary)] hover:bg-[var(--color-accent)] border-2 border-black rounded-sm"
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
