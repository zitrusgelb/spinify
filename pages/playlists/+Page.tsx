import { useContext, useEffect, useState } from "react"
import ApiContext from "components/ApiContext"
import MainElement from "../playlist/@id/MainElement"
import PlaylistGrid from "./PlaylistGrid"
import { Playlist } from "../playlist/@id/types"

export default function Page() {
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([])
  const [savedPlaylists, setSavedPlaylists] = useState<Playlist[]>([])
  const { api, login, user } = useContext(ApiContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    login().then(() => console.log("Login successful"))
  }, [])

  useEffect(() => {
    if (user) {
      fetchSavedPlaylists()
        .then(fetchUserPlaylists)
        .finally(() => setLoading(false))
    }
  }, [user])

  const fetchSavedPlaylists = async () => {
    const res = await fetchPlaylists()
    const results = await Promise.all(
      res.items
        .filter((playlist) => playlist.owner.id != user?.id)
        .map(async (playlist) => ({
          id: playlist.id,
          title: playlist.name,
          thumbnail: playlist.images[0].url,
        })),
    )
    setSavedPlaylists(results)
  }

  const fetchUserPlaylists = async () => {
    const res = await fetchPlaylists()
    const results = await Promise.all(
      res.items
        .filter((playlist) => playlist.owner.id == user?.id)
        .map(async (playlist) => ({
          id: playlist.id,
          title: playlist.name,
          thumbnail: playlist.images[0].url,
        })),
    )
    setUserPlaylists(results)
  }

  async function fetchPlaylists() {
    return await api.currentUser.playlists.playlists(50, 0)
  }

  return (
    <div className="flex flex-col">
      <MainElement title="Saved Playlists" />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></span>
        </div>
      ) : (
        <PlaylistGrid playlists={savedPlaylists} />
      )}
      <MainElement title="Your Playlists" />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></span>
        </div>
      ) : (
        <PlaylistGrid playlists={userPlaylists} />
      )}
    </div>
  )
}
