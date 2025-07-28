import { useCallback, useContext, useEffect, useState } from "react"
import ApiContext from "components/ApiContext"
import { Artist, Track, SimplifiedAlbum } from "@spotify/web-api-ts-sdk"
import { usePageContext } from "vike-react/usePageContext"
import TopTrackList from "./TopTrackList"
import AlbumList from "./AlbumList"
import Spinner from "components/LoadingSpinner"
import { UsersIcon } from "lucide-react"

export default function Page() {
  const { api } = useContext(ApiContext)
  const [loading, setLoading] = useState(true)
  const [albums, setAlbums] = useState<SimplifiedAlbum[]>([])
  const [tracks, setTracks] = useState<Track[]>([])
  const [artist, setArtist] = useState<Artist>()
  const id = usePageContext().routeParams.id

  useEffect(() => {
    fetchArtist()
      .then(fetchTopTracks)
      .then(fetchAlbums)
      .finally(() => setLoading(false))
  }, [])

  const fetchAlbums = useCallback(async () => {
    setLoading(true)
    const albums = await api.artists.albums(id)
    if (!albums) return
    setAlbums(albums.items.slice(0, 5))
  }, [id])

  const fetchTopTracks = useCallback(async () => {
    setLoading(true)
    const topTracks = await api.artists.topTracks(id, "DE")
    if (!topTracks) return
    setTracks(topTracks.tracks.slice(0, 5))
  }, [id])

  const fetchArtist = useCallback(async () => {
    setLoading(true)
    const artist = await api.artists.get(id)
    if (!artist) return
    setArtist(artist)
  }, [id])

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-1/2 items-center">
        <div className="flex flex-row items-center">
          <img
            src={artist?.images[0].url}
            alt={artist?.name}
            className="max-w-64 max-h-64 min-h-16 min-w-16 rounded-3xl object-cover"
          />
        </div>
        <div className="font-bold text-6xl text-center p-5">{artist?.name}</div>
      </div>
      <div className="flex flex-col w-full items-center">
        <div className="text-center text-lg font-bold flex">
          <UsersIcon /> <span className="ml-2">{artist?.followers.total.toLocaleString()} Followers</span>
        </div>
        <div className="text-center text-lg font-light italic">{artist?.genres.join(", ").toUpperCase()}</div>
      </div>
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-col xl:flex-row items-center xl:justify-center w-full md:w-3/4  gap-8">
          <div className="xl:basis-4/10 max-xl:w-full xl:grow-1 xl:shrink-0 xl:w-1">
            <div className="text-2xl font-bold text-center w-full pt-5">Top Tracks</div>
            {loading ? <Spinner /> : <TopTrackList tracks={tracks} />}
          </div>
          <div className="xl:basis-4/10 max-xl:w-full xl:grow-1 xl:shrink-0 xl:w-1">
            <div className="text-2xl font-bold text-center w-full pt-5">Albums</div>
            {loading ? <Spinner /> : <AlbumList albums={albums} />}
          </div>
        </div>
      </div>
    </div>
  )
}
