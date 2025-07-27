import { useContext, useEffect, useState } from "react"
import ApiContext from "components/ApiContext"
import { usePageContext } from "vike-react/usePageContext"
import MainElement from "components/MainElement"
import TrackList from "components/TrackList"
import Spinner from "components/LoadingSpinner"
import { Track } from "@spotify/web-api-ts-sdk"

export default function Page() {
  const { api } = useContext(ApiContext)
  const [loading, setLoading] = useState(true)
  const [playlistName, setPlaylistName] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [playlistCreator, setPlaylistCreator] = useState("")
  const [tracks, setTracks] = useState<Track[]>([])
  const id = usePageContext().routeParams.id

  useEffect(() => {
    fetchTracks().finally(() => setLoading(false))
  }, [])

  const fetchTracks = async () => {
    setLoading(true)
    const playlist = await api.playlists.getPlaylist(id)
    setTracks(playlist.tracks.items.map((track) => track.track))
    setThumbnail(playlist.images[0].url ?? "")
    setPlaylistName(playlist.name)
    setPlaylistCreator(playlist.owner.display_name)
  }

  return (
    <div className="flex flex-col p-5 w-full">
      <div className="flex flex-row items-center">
        <img
          src={thumbnail}
          alt={playlistName}
          className="max-w-48 max-h-48 min-h-16 min-w-16 rounded-3xl object-cover"
        />
        <div>
          <MainElement title={loading ? "Loading..." : playlistName} />
          <div className="text-m font-bold text-center pb-5 text-primary">Created by: {playlistCreator}</div>
        </div>
      </div>
      {loading ? <Spinner /> : <TrackList tracks={tracks} />}
    </div>
  )
}
