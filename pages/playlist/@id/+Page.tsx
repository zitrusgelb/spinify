import { useContext, useEffect, useState } from "react"
import ApiContext from "components/ApiContext"
import { usePageContext } from "vike-react/usePageContext"
import MainElement from "./MainElement"
import { Track } from "./types"
import TrackList from "./TrackList"

export default function Page() {
  const { api, login } = useContext(ApiContext)
  const [loading, setLoading] = useState(true)
  const [playlistName, setPlaylistName] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [playlistCreator, setPlaylistCreator] = useState("")
  const [tracks, setTracks] = useState<Track[]>([])
  const id = usePageContext().routeParams.id

  useEffect(() => {
    login().then(() => fetchTracks().finally(() => setLoading(false)))
  }, [])

  const fetchTracks = async () => {
    setLoading(true)
    const playlist = await api.playlists.getPlaylist(id)
    setPlaylistName(playlist.name)
    setPlaylistCreator(playlist.owner.display_name)
    setThumbnail(playlist.images[0].url)
    const items = await Promise.all(
      playlist.tracks.items.map(async (track) => ({
        id: track.track.id,
        title: track.track.name,
        artists: track.track.artists.map((artist) => ({
          id: artist.id,
          name: artist.name,
          thumbnail: null,
        })),
        album: track.track.album.name,
        thumbnail: track.track.album.images[0].url,
        durationMs: track.track.duration_ms,
      })),
    )
    setTracks(items)
  }

  return (
    <div className="flex flex-col p-5 w-full">
      <div className="flex flex-row items-center">
        <img
          src={thumbnail}
          alt={playlistName}
          className="max-w-32 max-h-32 min-h-16 min-w-16 rounded-3xl object-cover"
        />
        <MainElement title={loading ? "Loading..." : playlistName} />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></span>
        </div>
      ) : (
        <TrackList tracks={tracks} creator={playlistCreator} />
      )}
    </div>
  )
}
