import { Artist } from "@spotify/web-api-ts-sdk"
import { Grid } from "components/Grid"

export default function ArtistGrid({ artists }: { artists: Artist[] }) {
  return (
    <Grid>
      {artists.map((artist) => (
        <a href={`/artist/${artist.id}`} key={artist.id}>
          <ArtistElement thumbnail={artist.images[0]?.url} title={artist.name} />
        </a>
      ))}
    </Grid>
  )
}

function ArtistElement({ thumbnail, title }: { thumbnail: string | null; title: string }) {
  return (
    <div className="flex content-center flex-col gap-5 p-5">
      <div className="text-xl font-bold text-center w-64 pl-4 pr-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {title}
      </div>
      <img
        src={thumbnail ?? ""}
        alt={title}
        className="max-w-64 max-h-64 min-h-32 min-w-32 rounded-full object-cover"
      />
    </div>
  )
}
