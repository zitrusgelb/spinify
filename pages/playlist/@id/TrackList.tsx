import { Artist, Track } from "./types"
import { millisToTime } from "utils/time"

export default function TrackList({ tracks, creator }: { tracks: Track[]; creator: string }) {
  const totalDurationMs = tracks.reduce((sum, t) => sum + t.durationMs, 0)

  return (
    <div className="w-full h-screen p-5 overflow-y-scroll overflow-hidden scrollbar-styled">
      <div className="w-fit bg-gradient2 rounded-3xl content-center text-center p-5">
        <div className="text-sm font-bold text-left text-primary">Number of Tracks: {tracks.length}</div>
        <div className="text-sm font-bold text-left text-primary">
          Playlist duration: {millisToTime(totalDurationMs)}
        </div>
        <div className="text-sm font-bold text-left text-primary">Created by: {creator}</div>
      </div>

      <div className="h-screen content-center text-center">
        {tracks.map((track, idx) => (
          <TrackElement
            key={track.id}
            index={idx + 1}
            thumbnail={track.thumbnail}
            name={track.title}
            artists={track.artists}
            durationMs={track.durationMs}
          />
        ))}
      </div>
    </div>
  )
}

function TrackElement({
  index,
  thumbnail,
  name,
  artists,
  durationMs,
}: {
  index: number
  thumbnail: string
  name: string
  artists: Artist[]
  durationMs: number
}) {
  return (
    <div className="flex gap-5 pb-2 pt-2 w-full h-32">
      <div className="text-lg font-bold text-center p-2 content-center w-1.5">{index}</div>
      <img src={thumbnail ?? ""} alt={name} className="rounded-lg object-cover" />
      <div className="content-center w-full">
        <div className="text-lg font-bold text-left overflow-hidden overflow-ellipsis whitespace-nowrap">{name}</div>
        <div className="text-sm text-left overflow-hidden overflow-ellipsis whitespace-nowrap">
          {artists.map((a) => a.name).join(", ")}
        </div>
      </div>
      <div className="content-center text-sm pr-5 font-bold text-right">{millisToTime(durationMs)}</div>
      <hr />
    </div>
  )
}
