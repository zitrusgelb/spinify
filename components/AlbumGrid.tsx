import { SimplifiedAlbum } from "@spotify/web-api-ts-sdk"
import { Grid } from "components/Grid"

export default function AlbumGrid({ albums }: { albums: SimplifiedAlbum[] }) {
  return (
    <Grid>
      {albums.map((album) => (
        <a href={`/album/${album.id}`} key={album.id}>
          <AlbumElement thumbnail={album.images[0].url} title={album.name} />
        </a>
      ))}
    </Grid>
  )
}

function AlbumElement({ thumbnail, title }: { thumbnail: string; title: string }) {
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5 h-full">
      <img src={thumbnail ?? ""} alt={title} className="max-w-45 max-h-45 min-h-32 min-w-32 rounded-lg object-cover" />
      <div className="font-bold text-center w-45 pl-4 pr-4 truncate whitespace-nowrap">{title ?? ""}</div>
    </div>
  )
}
