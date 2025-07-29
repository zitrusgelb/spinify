import React, { useContext, useEffect, useRef, useState } from 'react'
import { Heart, Pause, Play } from 'lucide-react'
import ApiContext from 'components/ApiContext'
import PlayerContext from 'components/PlayerContext'

interface MiniPlayerProps {
  onOpenFullScreen: () => void
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({ onOpenFullScreen }) => {
  const { api } = useContext(ApiContext)
  const { player, playbackState } = useContext(PlayerContext)

  const currentTrack = playbackState?.track_window?.current_track
  const duration = playbackState?.duration || 1

  const [progress, setProgress] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!player || !playbackState || playbackState.paused) return
    const interval = setInterval(async () => {
      const state = await player.getCurrentState()
      if (state && !isSeeking) {
        setProgress(state.position)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [player, isSeeking, playbackState?.paused])

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    player?.togglePlay()
  }

  const addToLibrary = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const trackId = currentTrack?.id
    if (!trackId) return
    try {
      await api.currentUser.tracks.saveTracks([trackId])
    } catch (err) {
      console.error('Fehler beim Hinzufügen zur Bibliothek:', err)
    }
  }

  const handleSeek = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (!player || !progressRef.current || !duration) return

    const rect = progressRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const ratio = Math.max(0, Math.min(1, clickX / rect.width))
    const newPosition = ratio * duration

    setProgress(newPosition)
    setIsSeeking(true)
    await player.seek(newPosition)
    setTimeout(() => setIsSeeking(false), 300)
  }

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000)
    const min = Math.floor(totalSec / 60)
    const sec = totalSec % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  if (!currentTrack) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-primary text-secondary shadow-md z-50 cursor-pointer"
      onClick={onOpenFullScreen}
    >
      <div
        ref={progressRef}
        className="relative h-2 w-full bg-gray-600/40 hover:bg-gray-600/60 transition-all"
        onClick={handleSeek}
      >
        <div
          className="absolute h-2 bg-accent rounded-full transition-all"
          style={{ width: `${(progress / duration) * 100}%` }}
        />
      </div>
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col truncate max-w-[60%]">
          <span className="text-sm font-semibold truncate">
            {currentTrack.name || 'Unbekannter Titel'}
          </span>
          <span className="text-xs text-gray-400 truncate">
            {currentTrack.artists?.map(a => a.name).join(', ') || 'Unbekannter Künstler'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400">{formatTime(progress)}</span>
          <button
            onClick={togglePlay}
            className="p-2 bg-secondary text-black rounded-full hover:bg-accent hover:scale-105 hover:shadow-lg transition active:scale-95 active:shadow-md active:bg-accent/80"
            aria-label={playbackState?.paused ? 'Play' : 'Pause'}
          >
            {playbackState?.paused ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button
            onClick={addToLibrary}
            className="text-secondary hover:text-accent hover:scale-105 hover:shadow-lg transition active:scale-95 active:shadow-md active:text-accent/80"
            aria-label="Zur Bibliothek hinzufügen"
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MiniPlayer
