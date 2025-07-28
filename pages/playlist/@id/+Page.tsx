import { useContext, useEffect, useState } from "react"
import ApiContext from "components/ApiContext"
import { usePageContext } from "vike-react/usePageContext"
import { Track } from "@spotify/web-api-ts-sdk"
import TracklistView from "components/TracklistView"

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
    <TracklistView
      tracks={tracks}
      headerContent={
        <div className="h-full text-m font-bold text-center pb-5 text-primary">Created by: {playlistCreator}</div>
      }
      imgUrl={thumbnail}
      imgAlt={playlistName}
      loading={loading}
    />
  )
}
