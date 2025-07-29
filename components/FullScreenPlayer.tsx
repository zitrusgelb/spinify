import React, { useContext, useEffect, useState, useCallback, useRef, useMemo } from 'react'
import {
  Heart,
  MoreHorizontal,
  Play,
  Plus,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  X,
} from 'lucide-react'
import ApiContext from './ApiContext'
import PlayerContext from 'components/PlayerContext'
import { TrackItem } from '@spotify/web-api-ts-sdk'
import PlayArmSvg from 'assets/PlayArm.svg'

interface FullScreenPlayerProps {
  isOpen: boolean
  onClose: () => void
}

const FullScreenPlayer: React.FC<FullScreenPlayerProps> = ({ isOpen, onClose }) => {
  const { token: accessToken, api } = useContext(ApiContext)
  const { player, playbackState } = useContext(PlayerContext)
  const [queue, setQueue] = useState<TrackItem[]>([])

  const dialogRef = useRef<HTMLDialogElement | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen) return
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  useEffect(() => {
    api.player.getUsersQueue().then(data => setQueue(data.queue))
  }, [playbackState?.track_window?.next_tracks])

  if (!accessToken || !isOpen) return null

  const handleOverlayClick = () => onClose()
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation()

  const skipToNext = () => {
    console.log('skipToNext')
    player?.nextTrack()
  }
  const skipToPrevious = () => player?.previousTrack()

  const toggleShuffle = async () => {
    await api.player.togglePlaybackShuffle(!playbackState?.shuffle)
  }

  const toggleRepeat = async () => {
    await api.player.setRepeatMode(playbackState?.repeat_mode === 1 ? 'off' : 'track')
  }

  const addToLibrary = async () => {
    const trackId = playbackState?.track_window.current_track?.id
    if (!trackId) return
    await api.currentUser.tracks.saveTracks([trackId])
  }

  const addToQueue = async () => {
    const trackUri = playbackState?.track_window.current_track?.uri
    if (!trackUri) return
    await api.player.addItemToPlaybackQueue(trackUri)
  }

  const togglePlay = () => {
    player?.togglePlay()
  }

  const handleControl = (action: string) => {
    switch (action) {
      case 'forward':
        skipToNext()
        break
      case 'backward':
        skipToPrevious()
        break
      case 'shuffle':
        toggleShuffle()
        break
      case 'loop':
        toggleRepeat()
        break
      case 'like':
        addToLibrary()
        break
      case 'add':
        addToQueue()
        break
      default:
        break
    }
  }

  const controls = [
    { icon: <SkipBack size={20} />, action: 'backward' },
    { icon: <SkipForward size={20} />, action: 'forward' },
    { icon: <Plus size={20} />, action: 'add' },
    { icon: <Shuffle size={20} />, action: 'shuffle' },
    { icon: <Repeat size={20} />, action: 'loop' },
    { icon: <Heart size={20} />, action: 'like' },
    { icon: <MoreHorizontal size={20} />, action: 'more' },
  ]

  console.log(playbackState?.track_window.current_track)

  return (
    <dialog ref={dialogRef} open={isOpen} onClick={handleOverlayClick}>
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/20">
        <div
          onClick={stopPropagation}
          role="dialog"
          aria-modal="true"
          aria-label="Full Screen Music Player"
          className="rounded-xl shadow-xl w-[95vw] h-[90vh] bg-gradient p-10 relative flex flex-col max-w-screen-xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4  right-4 text-white hover:text-red-400 transition-colors"
            aria-label="Close player"
          >
            <X size={28} />
          </button>

          {playbackState?.track_window.current_track && (
            <>
              <h2 className="text-3xl font-bold text-primary text-wrap">
                {playbackState?.track_window.current_track.name}
              </h2>
              <h3 className="text-xl font-bold text-primary text-wrap">
                {playbackState?.track_window.current_track.artists.map(a => a.name).join(', ')}
              </h3>
              {playbackState?.track_window.current_track.album && (
                <p className="text-lg text-black mt-2">
                  Album: {playbackState?.track_window.current_track.album.name}
                </p>
              )}
            </>
          )}

          <div className="text-white flex flex-1 gap-8 items-center justify-between h-2/3">
            <div className="w-1/3 flex justify-start h-full">
              <div className="m-auto aspect-square w-full max-h-[80vh] bg-primary rounded-4xl shadow-inner flex items-center justify-center relative overflow-hidden">
                {playbackState?.track_window.current_track && (
                  <img
                    src={playbackState?.track_window.current_track?.album.images[0].url}
                    alt={playbackState?.track_window.current_track?.name}
                    className="w-95/100 h-95/100 left-5/200 top-5/200 object-cover absolute inset-0 rounded-full animate-vinyl"
                  />
                )}
                <img
                  src={PlayArmSvg}
                  alt="Arm"
                  className="absolute w-1/3 top-0 z-10 right-0 h-auto opacity-100 pointer-events-none origin-[76.3%_14.6%]"
                />
                <div className="absolute bottom-4 left-4 text-white">
                  <Volume2 size={24} />
                </div>
                <button
                  onClick={togglePlay}
                  className="absolute bottom-4 right-4 p-2 bg-accent text-primary hover:bg-accent transition"
                  aria-label="Play"
                >
                  <Play size={20} />
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between w-2/3 h-full">
              <div className="mt-8 space-y-4 text-base overflow-auto">
                {queue.map((track, i) => (
                  <div className="flex items-center space-x-3" key={i}>
                    <img
                      src={
                        track.type === 'episode'
                          ? //@ts-expect-error 2339 types from spotify API package are bad
                            track.images[0]?.url
                          : //@ts-expect-error 2339 types from spotify API package are bad
                            track.album.images[0]?.url
                      }
                      className="w-8 h-8 rounded"
                      alt="Track thumbnail"
                    />
                    <div>
                      {track.name}{' '}
                      {track.artists && <>– {track.artists?.map(a => a.name).join(', ')}</>}
                    </div>
                  </div>
                ))}
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
      </div>
    </dialog>
  )
}

export default FullScreenPlayer
