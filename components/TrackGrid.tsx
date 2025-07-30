import { Track } from "@spotify/web-api-ts-sdk"
import { Grid } from "components/Grid"

export default function TrackGrid({ tracks }: { tracks: Track[] }) {
  return (
    <Grid>
      {tracks.map((track) => (
        <a href={`/album/${track.album.id}`} key={track.id}>
          <TrackElement thumbnail={track.album.images[0]?.url ?? ''} title={track.name} />
        </a>
      ))}
    </Grid>
  )
}

function TrackElement({ thumbnail, title }: { thumbnail: string; title: string }) {
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5 h-full hover:scale-105 transition duration-200">
      <img
        src={thumbnail ?? ""}
        alt={title}
        className="max-w-45 max-h-45 min-h-32 min-w-32 rounded-lg aspect-square object-cover"
      />
      <div className="font-bold text-center w-45 pl-4 pr-4 truncate whitespace-nowrap">
        {title ?? ''}
      </div>
    </div>
  )
}
