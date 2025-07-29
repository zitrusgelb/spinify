import { millisToTime } from 'utils/time'
import { Track } from '@spotify/web-api-ts-sdk'
import { useContext } from 'react'
import ApiContext from 'components/ApiContext'
import PlayerContext from 'components/PlayerContext'

export default function TrackList({ tracks }: { tracks: Track[] }) {
  const totalDurationMs = tracks.reduce((sum, t) => sum + t.duration_ms, 0)

  return (
    <div className="w-full h-screen p-5 overflow-y-scroll overflow-hidden scrollbar-styled">
      <div className="w-fit bg-gradient2 rounded-3xl content-center text-center p-5">
        <div className="text-sm font-bold text-left text-primary">Number of Tracks: {tracks.length}</div>
        <div className="text-sm font-bold text-left text-primary">Total
          duration: {millisToTime(totalDurationMs)}</div>
      </div>

      <div className="h-screen p-5 text-center">
        {tracks.map((track, idx) => (
          <TrackElement key={track.id} index={idx + 1} track={track} />
        ))}
      </div>
    </div>
  )
}

function TrackElement({ track, index }: { track: Track; index: number }) {
  const { api } = useContext(ApiContext)
  const { deviceId } = useContext(PlayerContext)
  return (
    <div
      className="flex gap-5 pb-2 pt-2 w-full h-32 cursor-pointer hover:scale-101 transition duration-200"
      onClick={() => api.player.startResumePlayback(deviceId ?? '', undefined, [track.uri])}
    >
      <div className="text-lg font-bold text-center p-2 content-center w-14">{index}</div>
      <img src={track.album.images[0].url ?? null} alt={track.name} className="rounded-lg object-cover" />
      <div className="content-center w-full">
        <div className="text-lg font-bold text-left overflow-hidden overflow-ellipsis whitespace-nowrap">
          {track.name}
        </div>
        <div className="text-sm text-left overflow-hidden overflow-ellipsis whitespace-nowrap">
          {track.artists.map((a) => a.name).join(', ')}
        </div>
      </div>
      <div className="content-center text-sm pr-5 font-bold text-right">{millisToTime(track.duration_ms)}</div>
      <hr />
    </div>
  )
}
