import { SimplifiedAlbum } from "@spotify/web-api-ts-sdk"

export default function AlbumGrid({ albums }: { albums: SimplifiedAlbum[] }) {
  return (
    <div className="flex max-w-full overflow-x-scroll scrollbar-styled">
      {albums.map((album) => (
        <a href={`/album/${album.id}`} key={album.id}>
          <AlbumElement thumbnail={album.images[0].url} title={album.name} />
        </a>
      ))}
    </div>
  )
}

function AlbumElement({ thumbnail, title }: { thumbnail: string; title: string }) {
  return (
    <div className="flex content-center flex-col gap-5 p-5">
      <div className="text-xl font-bold text-center w-64 pl-4 pr-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {title ?? ""}
      </div>
      <img src={thumbnail ?? ""} alt={title} className="max-w-64 max-h-64 min-h-32 min-w-32 rounded-lg object-cover" />
    </div>
  )
}
