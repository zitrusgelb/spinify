import { Playlist } from "pages/playlist/@id/types"

export default function PlaylistGrid({ playlists }: { playlists: Playlist[] }) {
  return (
    <div className="flex gap-5 max-w-full overflow-x-scroll scrollbar-styled">
      {playlists.map((playlist) => (
        <a href={`/playlist/${playlist.id}`} key={playlist.id}>
          <PlaylistElement key={playlist.title} thumbnail={playlist.thumbnail} title={playlist.title} />
        </a>
      ))}
    </div>
  )
}

function PlaylistElement({ thumbnail, title }: { thumbnail: string | null; title: string }) {
  return (
    <div className="flex content-center flex-col gap-5 p-5">
      <div className="text-xl font-bold text-center w-64 pl-4 pr-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {title}
      </div>
      <img src={thumbnail ?? ""} alt={title} className="max-w-64 max-h-64 min-h-32 min-w-32 rounded-lg object-cover" />
    </div>
  )
}
