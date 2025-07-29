import { useContext, useEffect, useState } from 'react'
import ApiContext from 'components/ApiContext'
import MainElement from 'components/MainElement'
import PlaylistGrid from 'components/PlaylistGrid'
import Spinner from 'components/LoadingSpinner'
import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk'

export default function Page() {
  const [userPlaylists, setUserPlaylists] = useState<SimplifiedPlaylist[]>([])
  const [savedPlaylists, setSavedPlaylists] = useState<SimplifiedPlaylist[]>([])
  const { api, user } = useContext(ApiContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    fetchSavedPlaylists()
      .then(fetchUserPlaylists)
      .finally(() => setLoading(false))
  }, [user])

  const fetchSavedPlaylists = async () => {
    const res = await fetchPlaylists()
    if (!user) return
    setSavedPlaylists(res.items.filter(playlist => playlist.owner.id != user.id))
  }

  const fetchUserPlaylists = async () => {
    const res = await fetchPlaylists()
    if (!user) return
    setUserPlaylists(res.items.filter(playlist => playlist.owner.id == user.id))
  }

  async function fetchPlaylists() {
    return await api.currentUser.playlists.playlists(50, 0)
  }

  return (
    <div className="flex flex-col">
      <MainElement title="Saved Playlists" />
      {loading ? <Spinner /> : <PlaylistGrid playlists={savedPlaylists} />}
      <MainElement title="Your Playlists" />
      {loading ? <Spinner /> : <PlaylistGrid playlists={userPlaylists} />}
    </div>
  )
}
