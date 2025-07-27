import { useContext, useEffect, useState } from "react"
import ApiContext from "components/ApiContext"
import { usePageContext } from "vike-react/usePageContext"
import MainElement from "components/MainElement"
import Spinner from "components/LoadingSpinner"
import { Track } from "@spotify/web-api-ts-sdk"
import TrackList from "components/TrackList"

export default function Page() {
  const { api, login } = useContext(ApiContext)
  const [loading, setLoading] = useState(true)
  const [albumName, setAlbumName] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [tracks, setTracks] = useState<Track[]>([])
  const id = usePageContext().routeParams.id

  useEffect(() => {
    login().then(() => fetchTracks().finally(() => setLoading(false)))
  }, [])

  const fetchTracks = async () => {
    setLoading(true)
    const album = await api.albums.get(id)
    setAlbumName(album.name)
    setThumbnail(album.images[0].url)
    setTracks(await Promise.all(album.tracks.items.map(async (track) => api.tracks.get(track.id))))
  }

  return (
    <div className="flex flex-col p-5 w-full">
      <div className="flex flex-row items-center">
        <img
          src={thumbnail}
          alt={albumName}
          className="max-w-48 max-h-48 min-h-16 min-w-16 m-5 rounded-3xl object-cover"
        />
        <MainElement title={loading ? "Loading..." : albumName} />
      </div>
      {loading ? <Spinner /> : <TrackList tracks={tracks} />}
    </div>
  )
}
