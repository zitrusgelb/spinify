import React, { useContext, useEffect, useState, useCallback } from "react"
import { Heart, MoreHorizontal, Play, Plus, Repeat, Shuffle, SkipBack, SkipForward, Volume2, X } from "lucide-react"
import ApiContext from "./ApiContext"

interface FullScreenPlayerProps {
  isOpen: boolean
  onClose: () => void
}

const FullScreenPlayer: React.FC<FullScreenPlayerProps> = ({ isOpen, onClose }) => {
  const { token: accessToken } = useContext(ApiContext)
  const [currentTrack, setCurrentTrack] = useState<any>(null)
  const [queue, setQueue] = useState<any[]>([])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!isOpen || !accessToken) return

    const headers = { Authorization: `Bearer ${accessToken}` }

    const fetchTrackData = async () => {
      try {
        const nowPlayingRes = await fetch("https://api.spotify.com/v1/me/player/currently-playing", { headers })
        if (nowPlayingRes.ok) {
          const nowPlaying = await nowPlayingRes.json()
          setCurrentTrack(nowPlaying?.item)
        }

        const queueRes = await fetch("https://api.spotify.com/v1/me/player/queue", { headers })
        if (queueRes.ok) {
          const queueData = await queueRes.json()
          setQueue(queueData?.queue?.slice(0, 2) || [])
        }
      } catch (error) {
        console.error("Failed to fetch Spotify track info:", error)
      }
    }

    fetchTrackData()
  }, [isOpen, accessToken])

  useEffect(() => {
    if (!isOpen) return
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen || !accessToken) return null

  const handleOverlayClick = () => onClose()
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation()

  const skipToNext = async () => {
    await fetch("https://api.spotify.com/v1/me/player/next", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  }

  const skipToPrevious = async () => {
    await fetch("https://api.spotify.com/v1/me/player/previous", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  }

  const toggleShuffle = async () => {
    await fetch(`https://api.spotify.com/v1/me/player/shuffle?state=true`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  }

  const toggleRepeat = async () => {
    await fetch(`https://api.spotify.com/v1/me/player/repeat?state=context`, {
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

  const togglePlay = async () => {
    const res = await fetch("https://api.spotify.com/v1/me/player", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const data = await res.json()
    const isPlaying = data?.is_playing

    await fetch(`https://api.spotify.com/v1/me/player/${isPlaying ? "pause" : "play"}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
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
          title="Close"
        >
          <X size={28} />
        </button>

        <div className="text-white flex flex-1 gap-8 items-center justify-between">
          <div className="flex-1 basis-1/3 flex justify-start h-full">
            <div className="m-auto aspect-square w-full max-w-[600px] max-h-[80vh] bg-[var(--color-primary)] rounded-[2rem] shadow-inner flex items-center justify-center relative overflow-hidden">
              <div className="w-2 h-2 bg-black rounded-full absolute z-10" />
              <div className="absolute bottom-4 left-4 text-white">
                <Volume2 size={24} />
              </div>
              <button
                onClick={togglePlay}
                className="absolute bottom-4 right-4 p-2 bg-red-600 rounded-md text-white hover:bg-red-700 transition"
                aria-label="Play"
                title="Play"
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
                    {currentTrack.name} – {currentTrack.artists.map((a: any) => a.name).join(", ")}
                  </h2>
                  <p className="text-lg text-gray-100 mt-1">
                    {currentTrack.album.name} – {new Date(currentTrack.album.release_date).getFullYear()}
                  </p>
                </>
              )}
              <div className="mt-8 space-y-4 text-base">
                {queue.map((track, i) => (
                  <div className="flex items-center space-x-3" key={i}>
                    <img src={track.album.images[0]?.url} className="w-8 h-8 rounded" alt="Track thumbnail" />
                    <div>
                      <div>
                        {track.name} – {track.artists.map((a: any) => a.name).join(", ")}
                      </div>
                      <div className="text-xs text-gray-300">
                        {track.album.name} – {new Date(track.album.release_date).getFullYear()}
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
