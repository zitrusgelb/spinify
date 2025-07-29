import { useContext, useEffect, useState } from 'react'
import ApiContext from 'components/ApiContext'
import MainElement from 'components/MainElement'
import ArtistGrid from 'components/ArtistGrid'
import shuffle from 'components/ItemMixer'
import Spinner from 'components/LoadingSpinner'
import AlbumGrid from 'components/AlbumGrid'
import { Artist, SimplifiedAlbum, Track } from '@spotify/web-api-ts-sdk'
import TrackGrid from 'components/TrackGrid'
import FullScreenPlayer from 'layouts/FullScreenPlayer'
import MiniPlayer from 'layouts/MiniPlayer'

export default function Page() {
  const { api, user } = useContext(ApiContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [topSongs, setTopSongs] = useState<Track[]>([])
  const [newReleases, setNewReleases] = useState<SimplifiedAlbum[]>([])
  const [topArtists, setTopArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    fetchTopSongs()
      .then(fetchTopArtists)
      .then(fetchNewReleases)
      .finally(() => setLoading(false))
  }, [user])

  const fetchTopSongs = async () => {
    const resItems = await api.player.getRecentlyPlayedTracks()
    setTopSongs(resItems.items.map(track => track.track))
  }

  const fetchNewReleases = async () => {
    const resNewReleases = await api.browse.getNewReleases('DE', 20, Math.floor(Math.random() * 20))
    setNewReleases(resNewReleases.albums.items)
  }

  const fetchTopArtists = async () => {
    const resTopArtists = await api.currentUser.topItems('artists', 'medium_term', 20, 0)
    setTopArtists(shuffle(resTopArtists.items))
  }

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 bg-[var(--color-primary)] text-white px-4 py-2 rounded"
      >
        Open Fullscreen Player
      </button>

      <MainElement title="Recently Played" />
      {loading ? <Spinner /> : <TrackGrid tracks={topSongs} />}
      <MainElement title="Your Artists" />
      {loading ? <Spinner /> : <ArtistGrid artists={topArtists} />}
      <MainElement title="New Releases" />
      {loading ? <Spinner /> : <AlbumGrid albums={newReleases} />}
      <FullScreenPlayer isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {!isModalOpen && <MiniPlayer onOpenFullScreen={() => setIsModalOpen(true)} />}
    </div>
  )
}
