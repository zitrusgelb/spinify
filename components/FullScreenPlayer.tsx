import React, { useContext, useEffect, useState, useCallback, useRef } from "react"
import { Heart, MoreHorizontal, Play, Plus, Repeat, Shuffle, SkipBack, SkipForward, Volume2, X } from "lucide-react"
import ApiContext from "./ApiContext"
import useSpotifyPlayer from "./player"

interface FullScreenPlayerProps {
  isOpen: boolean
  onClose: () => void
}

const FullScreenPlayer: React.FC<FullScreenPlayerProps> = ({ isOpen, onClose }) => {
  const { token: accessToken } = useContext(ApiContext)
  const { player, playbackState } = useSpotifyPlayer(accessToken)
  const [currentTrack, setCurrentTrack] = useState<Spotify.Track | null>(null)
  const [queue, setQueue] = useState<Spotify.Track[]>([])

  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (playbackState) {
      setCurrentTrack(playbackState.track_window.current_track)
      setQueue(playbackState.track_window.next_tracks.slice(0, 2))
    }
  }, [playbackState])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (isOpen && dialogRef.current && !dialogRef.current.open) {
      try {
        dialogRef.current.showModal()
      } catch (e) {
        console.error("Failed to show dialog:", e)
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!accessToken) return null

  const handleOverlayClick = () => onClose()
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation()

  const skipToNext = () => player?.nextTrack()
  const skipToPrevious = () => player?.previousTrack()

  const toggleShuffle = async () => {
    await fetch("https://api.spotify.com/v1/me/player/shuffle?state=true", {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  }

  const toggleRepeat = async () => {
    await fetch("https://api.spotify.com/v1/me/player/repeat?state=context", {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  }

  const addToLibrary = async () => {
    const trackId = currentTrack?.id
    if (!trackId) return
    await fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  }

  const addToQueue = async () => {
    const trackUri = currentTrack?.uri
    if (!trackUri) return
    await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${trackUri}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  }

  const togglePlay = () => {
    if (!playbackState) return
    playbackState.paused ? player?.resume() : player?.pause()
  }

  const handleControl = (action: string) => {
    switch (action) {
      case "forward":
        skipToNext()
        break
      case "backward":
        skipToPrevious()
        break
      case "shuffle":
        toggleShuffle()
        break
      case "loop":
        toggleRepeat()
        break
      case "like":
        addToLibrary()
        break
      case "add":
        addToQueue()
        break
      default:
        break
    }
  }

  const controls = [
    { icon: <SkipBack size={20} />, action: "backward" },
    { icon: <SkipForward size={20} />, action: "forward" },
    { icon: <Plus size={20} />, action: "add" },
    { icon: <Shuffle size={20} />, action: "shuffle" },
    { icon: <Repeat size={20} />, action: "loop" },
    { icon: <Heart size={20} />, action: "like" },
    { icon: <MoreHorizontal size={20} />, action: "more" },
  ]

  return (
    <dialog
      ref={dialogRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20"
    >
      <div
        onClick={stopPropagation}
        role="dialog"
        aria-modal="true"
        aria-label="Full Screen Music Player"
        className="rounded-xl shadow-xl w-[95vw] h-[90vh] bg-gradient p-10 relative flex flex-col max-w-screen-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-15 right-15 text-white hover:text-red-400 transition-colors"
          aria-label="Close player"
        >
          <X size={28} />
        </button>

        <div className="text-white flex flex-1 gap-8 items-center justify-between">
          <div className="flex-1 basis-1/3 flex justify-start h-full">
            <div className="m-auto aspect-square w-full max-w-[600px] max-h-[80vh] bg-[var(--color-primary)] rounded-[2rem] shadow-inner flex items-center justify-center relative overflow-hidden">
              <svg
                width="237"
                height="427"
                viewBox="0 0 237 427"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 right-0 w-[30%] h-auto opacity-100 pointer-events-none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M98.8751 417.046L82.9647 400.96C81.13 399.105 81.1464 396.109 83.0014 394.274L89.7239 387.625C91.5789 385.791 94.5746 385.807 96.4093 387.662L112.32 403.749C114.154 405.604 114.138 408.6 112.283 410.435L105.56 417.083C103.705 418.918 100.71 418.901 98.8751 417.046Z"
                  fill="var(--color-accent)"
                />
                <path
                  d="M182 117C212.376 117 237 92.3757 237 62C237 31.6243 212.376 7 182 7C151.624 7 127 31.6243 127 62C127 92.3757 151.624 117 182 117Z"
                  fill="var(--color-accent)"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M114.203 370.284L64.6641 419.137C51.7025 432.099 29.397 426.034 25.4427 422.039L6.17295 402.375C2.21865 398.381 -3.18689 378.77 2.3925 374.152L65.9492 311.231C69.9436 307.277 76.3966 307.31 80.3514 311.304L117.616 348.945C121.571 352.94 118.198 366.329 114.203 370.284Z"
                  fill="var(--color-accent)"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M222.006 36.4421V91.1533C222.006 111.266 205.676 127.595 185.563 127.595H177.903C157.79 127.595 141.461 111.266 141.461 91.1533V36.4421C141.461 16.3291 157.79 0 177.903 0H185.563C205.676 0 222.006 16.3291 222.006 36.4421Z"
                  fill="var(--color-accent)"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M98.0493 360.736L53.2166 405.365C49.4961 409.085 41.2847 409.795 36.0844 408.283C32.0229 407.103 22.7239 398.947 20.7443 395.682C18.6054 392.154 17.3406 386.904 20.7443 382.78L74.6321 328.893C78.3527 325.172 77.2989 325.172 81.0194 328.893L98.0493 345.923C101.77 349.644 101.77 357.016 98.0493 360.736Z"
                  fill="var(--color-primary)"
                />
                <path
                  d="M92.4812 316.745L135.706 274.097C147.106 261.743 153 254.971 158.142 241.837C162.866 229.771 164.131 219.325 164.844 203.916V134.881"
                  stroke="var(--color-accent)"
                  strokeWidth="41.67"
                  strokeMiterlimit="1.5"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
                <path
                  d="M117.647 339.178L160.324 298.156C171.724 285.802 186.099 266.22 191.24 253.086C195.964 241.02 198.34 224.356 199.052 208.947V139.913"
                  stroke="var(--color-accent)"
                  strokeWidth="41.67"
                  strokeMiterlimit="1.5"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
                <path
                  d="M111.596 321.497L150.393 283.251C161.793 270.898 168.362 262.73 173.503 249.596C178.228 237.531 181.592 221.322 182.305 205.913V136.894"
                  stroke="var(--color-primary)"
                  strokeWidth="37.5"
                  strokeMiterlimit="1.5"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M200.824 37.2247V87.0466C200.824 96.6044 193.064 104.364 183.506 104.364H179.867C170.309 104.364 162.549 96.6044 162.549 87.0466V37.2247C162.549 27.6673 170.309 19.908 179.867 19.908H183.506C193.064 19.908 200.824 27.6673 200.824 37.2247Z"
                  fill="var(--color-primary)"
                />
                <path
                  d="M75.9683 329.848L85.2157 320.601L123.399 358.784L114.152 368.032L75.9683 329.848Z"
                  fill="var(--color-accent)"
                />
                <rect x="201" y="100" width="19" height="29" fill="var(--color-accent)" />
                <rect x="144" y="91" width="19" height="33" fill="var(--color-accent)" />
              </svg>
              <div className="w-2 h-2 bg-black rounded-full absolute z-10" />
              <div className="absolute bottom-4 left-4 text-white">
                <Volume2 size={24} />
              </div>
              <button
                onClick={togglePlay}
                className="absolute bottom-4 right-4 p-2 bg-red-600 rounded-md text-white hover:bg-red-700 transition"
                aria-label="Play"
              >
                <Play size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-between flex-1 h-full">
            <div>
              {currentTrack && (
                <>
                  <h2 className="text-4xl font-bold text-[var(--color-secondary)]">
                    {currentTrack.name} – {currentTrack.artists.map((a) => a.name).join(", ")}
                  </h2>
                </>
              )}

              <div className="mt-8 space-y-4 text-base">
                {queue.map((track, i) => (
                  <div className="flex items-center space-x-3" key={i}>
                    <img src={track.album.images[0]?.url} className="w-8 h-8 rounded" alt="Track thumbnail" />
                    <div>
                      <div>
                        {track.name} – {track.artists.map((a) => a.name).join(", ")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-10">
              {controls.map((btn, i) => (
                <button
                  key={i}
                  title={btn.action}
                  onClick={() => handleControl(btn.action)}
                  className="w-12 h-12 flex items-center justify-center bg-[var(--color-primary)] text-[var(--color-secondary)] hover:bg-[var(--color-accent)] border-2 border-black rounded-sm transition-transform hover:scale-105"
                >
                  {btn.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default FullScreenPlayer
