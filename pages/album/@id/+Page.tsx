import { useContext, useEffect, useState } from "react"
import ApiContext from "components/ApiContext"
import { usePageContext } from "vike-react/usePageContext"
import { Track } from "@spotify/web-api-ts-sdk"
import TracklistView from "components/TracklistView"

export default function Page() {
  const { api } = useContext(ApiContext)
  const [loading, setLoading] = useState(true)
  const [albumName, setAlbumName] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [tracks, setTracks] = useState<Track[]>([])
  const id = usePageContext().routeParams.id

  useEffect(() => {
    fetchTracks().finally(() => setLoading(false))
  }, [])

  const fetchTracks = async () => {
    setLoading(true)
    const album = await api.albums.get(id)
    setAlbumName(album.name)
    setThumbnail(album.images[0].url)
    setTracks(await Promise.all(album.tracks.items.map(async (track) => api.tracks.get(track.id))))
  }

  return <TracklistView tracks={tracks} imgUrl={thumbnail} imgAlt={albumName} loading={loading} />
}
