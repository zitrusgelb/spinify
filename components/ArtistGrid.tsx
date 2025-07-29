import { Artist } from '@spotify/web-api-ts-sdk'
import { Grid } from 'components/Grid'

export default function ArtistGrid({ artists }: { artists: Artist[] }) {
  return (
    <Grid>
      {artists.map(artist => (
        <a href={`/artist/${artist.id}`} key={artist.id}>
          <ArtistElement thumbnail={artist.images[0]?.url ?? ''} title={artist.name} />
        </a>
      ))}
    </Grid>
  )
}

function ArtistElement({ thumbnail, title }: { thumbnail: string | null; title: string }) {
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5 h-full hover:scale-105 transition duration-200">
      <img
        src={thumbnail ?? ''}
        alt={title}
        className="max-w-45 max-h-45 min-h-32 min-w-32 aspect-square rounded-full object-cover"
      />
      <div className="font-bold text-center w-45 pl-4 pr-4 truncate whitespace-nowrap">{title}</div>
    </div>
  )
}
