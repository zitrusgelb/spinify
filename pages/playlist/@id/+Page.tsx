import { useContext, useEffect, useState } from "react"
import ApiContext from "components/ApiContext"
import { usePageContext } from "vike-react/usePageContext"

type Track = {
  id: string
  title: string
  artists: Artist[]
  album: string
  thumbnail: string
  durationMs: number
}
type Artist = { id: string; name: string }

export default function Page() {
  const { api, login } = useContext(ApiContext)
  const [loading, setLoading] = useState(true)
  const [playlistName, setPlaylistName] = useState("")
  const [playlistCreator, setPlaylistCreator] = useState("")
  const [tracks, setTracks] = useState<Track[]>([])
  const id = usePageContext().routeParams.id
  const totalDurationMs = tracks.reduce((sum, t) => sum + t.durationMs, 0)

  useEffect(() => {
    login().then(() => fetchTracks().finally(() => setLoading(false)))
  }, [])

  const fetchTracks = async () => {
    setLoading(true)
    const playlist = await api.playlists.getPlaylist(id)
    setPlaylistName(playlist.name)
    setPlaylistCreator(playlist.owner.display_name)
    const items = await Promise.all(
      playlist.tracks.items.map(async (track) => ({
        id: track.track.id,
        title: track.track.name,
        artists: track.track.artists.map((artist) => ({
          id: artist.id,
          name: artist.name,
        })),
        album: track.track.album.name,
        thumbnail: track.track.album.images[0].url,
        durationMs: track.track.duration_ms,
      })),
    )
    setTracks(items)
  }

  return (
    <div className="flex flex-col gap-11 p-5 w-full">
      <MainElement title={playlistName} />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></span>
        </div>
      ) : (
        <TrackList tracks={tracks} />
      )}
    </div>
  )

  function MainElement({ title }: { title: string }) {
    return (
      <div className="flex flex-row p-5 gap-5">
        <div className="font-bold text-3xl text-secondary bg-primary rounded-3xl w-fit h-fit p-5">
          {loading ? "Loading..." : title}
        </div>
      </div>
    )
  }

  function TrackList({ tracks }: { tracks: Track[] }) {
    return (
      <div className="w-full p-5">
        <div className="w-fit bg-gradient2 rounded-3xl content-center text-center p-5 gap-5">
          <div className="text-sm font-bold text-left text-primary">Number of Tracks: {tracks.length}</div>
          <div className="text-sm font-bold text-left text-primary">
            Playlist duration: {millisToTime(totalDurationMs)}
          </div>
          <div className="text-sm font-bold text-left text-primary">Created by: {playlistCreator}</div>
        </div>
        <hr className="content-center p-5" />
        <div className="w-full content-center text-center">
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
        <div className="content-center w-2/3">
          <div className="text-lg font-bold text-left overflow-hidden overflow-ellipsis whitespace-nowrap">{name}</div>
          <div className="text-sm text-left overflow-hidden overflow-ellipsis whitespace-nowrap">
            {artists.map((a) => a.name).join(", ")}
          </div>
        </div>
        <div className="content-center text-sm font-bold text-right">{millisToTime(durationMs)}</div>
        <hr />
      </div>
    )
  }

  function millisToTime(millis: number) {
    const hours = Math.floor(millis / 3600000)
    const minutes = Math.floor((millis % 3600000) / 60000)
    const seconds = Math.floor((millis % 60000) / 1000)
    const paddedMinutes = hours > 0 ? String(minutes).padStart(2, "0") : String(minutes)
    const paddedSeconds = String(seconds).padStart(2, "0")
    return hours > 0 ? `${hours}:${paddedMinutes}:${paddedSeconds}` : `${minutes}:${paddedSeconds}`
  }
}
