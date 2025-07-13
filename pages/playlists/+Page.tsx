import { useContext, useEffect, useState } from "react"
import ApiContext from "components/ApiContext"

type Playlist = { title: string; thumbnail: string | null; id: string }

export default function Page() {
  const [savedPlaylists, setSavedPlaylists] = useState<Playlist[]>([])
  const { api, login } = useContext(ApiContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    login().then(() => fetchSavedPlaylists().finally(() => setLoading(false)))
  }, [])

  const fetchSavedPlaylists = async () => {
    const res = await api.currentUser.playlists.playlists(30, 0)
    const results = await Promise.all(
      res.items.map(async (playlist) => ({
        id: playlist.id,
        title: playlist.name,
        thumbnail: playlist.images[0].url,
      })),
    )
    setSavedPlaylists(results)
  }

  const handleOpen = (id: string) => {
    window.location.href = `/playlist/${id}`
  }

  return (
    <div className="flex flex-col gap-11 p-5 w-fit">
      <MainElement title="Saved Playlists" />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></span>
        </div>
      ) : (
        <PlaylistGrid playlists={savedPlaylists} />
      )}
    </div>
  )

  function MainElement({ title }: { title: string }) {
    return (
      <div className=" flex felx-row p-5 gap-5">
        <div className=" font-bold text-3xl text-secondary bg-primary rounded-3xl w-fit h-fit p-5"> {title}</div>
      </div>
    )
  }

  function PlaylistGrid({ playlists }: { playlists: Playlist[] }) {
    return (
      <div className="flex gap-5 flex-cols-4 flex-wrap">
        {playlists.map((playlist) => (
          <button
            key={playlist.id}
            onClick={() => handleOpen(playlist.id)}
            className="p-0 bg-transparent border-none text-left cursor-pointer"
          >
            <PlaylistElement key={playlist.title} thumbnail={playlist.thumbnail} title={playlist.title} />
          </button>
        ))}
      </div>
    )
  }

  function PlaylistElement({ thumbnail, title }: { thumbnail: string | null; title: string }) {
    return (
      <div className="flex content-center flex-col gap-5 p-5">
        <div className="text-2xl text-center w-64 pl-4 pr-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {title}
        </div>
        <img
          src={thumbnail ?? ""}
          alt={title}
          className="max-w-64 max-h-64 min-h-32 min-w-32 rounded-lg object-cover"
        />
      </div>
    )
  }
}
