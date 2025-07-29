import React, { useContext } from 'react'
import { Heart, Play, Pause } from 'lucide-react'
import ApiContext from './ApiContext'
import PlayerContext from 'components/PlayerContext'

interface MiniPlayerProps {
  onOpenFullScreen: () => void
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({ onOpenFullScreen }) => {
  const { api } = useContext(ApiContext)
  const { player, playbackState } = useContext(PlayerContext)

  const currentTrack = playbackState?.track_window?.current_track

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

  if (!currentTrack) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-primary text-white px-4 py-3 flex items-center justify-between shadow-md z-50 cursor-pointer"
      onClick={onOpenFullScreen}
    >
      <div className="flex flex-col truncate max-w-[60%]">
        <span className="text-sm font-semibold truncate">
          {currentTrack.name || 'Unbekannter Titel'}
        </span>
        <span className="text-xs text-gray-400 truncate">
          {currentTrack.artists?.map(a => a.name).join(', ') || 'Unbekannter Künstler'}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="p-2 bg-white text-black rounded-full hover:bg-gray-300 transition"
          aria-label={playbackState?.is_playing ? 'Pause' : 'Play'}
        >
          {playbackState?.is_playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          onClick={addToLibrary}
          className="text-white hover:text-green-500 transition"
          aria-label="Zur Bibliothek hinzufügen"
        >
          <Heart size={20} />
        </button>
      </div>
    </div>
  )
}

export default MiniPlayer
