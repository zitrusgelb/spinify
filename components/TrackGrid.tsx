import { Track } from "@spotify/web-api-ts-sdk"

export default function TrackGrid({ tracks }: { tracks: Track[] }) {
  return (
    <div className="flex max-w-full overflow-x-scroll scrollbar-styled">
      {tracks.map((track) => (
        <a href={`/album/${track.album.id}`} key={track.id}>
          <TrackElement thumbnail={track.album.images[0].url} title={track.name} />
        </a>
      ))}
    </div>
  )
}

function TrackElement({ thumbnail, title }: { thumbnail: string; title: string }) {
  return (
    <div className="flex content-center flex-col gap-5 p-5">
      <div className="text-xl font-bold text-center w-64 pl-4 pr-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {title ?? ""}
      </div>
      <img src={thumbnail ?? ""} alt={title} className="max-w-64 max-h-64 min-h-32 min-w-32 rounded-lg object-cover" />
    </div>
  )
}
