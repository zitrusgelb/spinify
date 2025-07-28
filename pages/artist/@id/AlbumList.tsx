import { SimplifiedAlbum } from "@spotify/web-api-ts-sdk"

export default function AlbumList({ albums }: { albums: SimplifiedAlbum[] }) {
  return (
    <div className="text-center w-full">
      {albums.map((album: SimplifiedAlbum) => (
        <a href={`/album/${album.id}`} key={album.id}>
          <AlbumElement key={album.id} album={album} />
        </a>
      ))}
    </div>
  )
}

function AlbumElement({ album }: { album: SimplifiedAlbum }) {
  return (
    <div className="flex gap-5 pb-2 pt-2 w-full h-32">
      <img src={album.images[0].url ?? null} alt={album.name} className="rounded-lg object-cover" />
      <div className="content-center w-10/12 overflow-hidden overflow-ellipsis whitespace-nowrap">
        <div className="text-lg font-bold text-left overflow-hidden overflow-ellipsis whitespace-nowrap">
          {album.name}
        </div>
        <div className="text-sm text-left overflow-hidden overflow-ellipsis whitespace-nowrap">
          {album.artists.map((a) => a.name).join(", ")}
        </div>
      </div>
      <div className="content-center text-sm pr-5 font-light text-right">{album.release_date.substring(0, 4)}</div>
      <hr />
    </div>
  )
}
