import { millisToTime } from "utils/time"
import { Track } from "@spotify/web-api-ts-sdk"

export default function TopTrackList({ tracks }: { tracks: Track[] }) {
  return (
    <div className="text-center w-full">
      {tracks.map((track) => (
        <TrackElement key={track.id} track={track} />
      ))}
    </div>
  )
}

function TrackElement({ track }: { track: Track }) {
  return (
    <div className="flex gap-5 pb-2 pt-2 w-full h-32 cursor-pointer hover:scale-105 transition duration-200">
      <img src={track.album.images[0].url ?? null} alt={track.name} className="rounded-lg object-cover" />
      <div className="content-center w-10/12 overflow-hidden overflow-ellipsis whitespace-nowrap">
        <div className="text-lg font-bold text-left overflow-hidden overflow-ellipsis whitespace-nowrap">
          {track.name}
        </div>
        <div className="text-sm text-left overflow-hidden overflow-ellipsis whitespace-nowrap">
          {track.artists.map((a) => a.name).join(", ")}
        </div>
      </div>
      <div className="content-center text-sm pr-5 font-bold text-right">{millisToTime(track.duration_ms)}</div>
      <hr />
    </div>
  )
}
