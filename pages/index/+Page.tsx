import { useContext, useEffect, useState } from "react"
import ApiContext from "components/ApiContext"
import MainElement from "../playlist/@id/MainElement"
import { Artist } from "../playlist/@id/types"
import ArtistGrid from "./ArtistGrid"
import { Item, ItemType } from "./types"
import ItemGrid from "./ItemGrid"

export default function Page() {
  const { api, login, token, user } = useContext(ApiContext)

  // const { player, playbackState } = useSpotifyPlayer(token)
  const [topSongs, setTopSongs] = useState<Item[]>([])
  const [newReleases, setNewReleases] = useState<Item[]>([])
  const [topArtists, setTopArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    login().then(() => console.log("Login successful"))
  }, [])

  useEffect(() => {
    if (user) {
      fetchTopSongs()
        .then(fetchTopArtists)
        .then(fetchNewReleases)
        .finally(() => setLoading(false))
    }
  }, [user])

  const fetchTopSongs = async () => {
    const resItems = await api.currentUser.topItems("tracks", "medium_term", 20, Math.floor(Math.random() * 20))
    const itemsResult = await Promise.all(
      resItems.items.map(async (item) => ({
        id: item.id,
        name: item.name,
        thumbnail: item.album.images[0].url,
        type: ItemType.Track,
      })),
    )
    setTopSongs(itemsResult)
  }

  const fetchNewReleases = async () => {
    const resNewReleases = await api.browse.getNewReleases("DE", 20, Math.floor(Math.random() * 20))
    const newReleasesResult = await Promise.all(
      resNewReleases.albums.items.map(async (release) => ({
        id: release.id,
        name: release.name,
        thumbnail: release.images[0].url,
        type: ItemType.Album,
      })),
    )
    setNewReleases(newReleasesResult)
  }

  const fetchTopArtists = async () => {
    const resTopArtists = await api.currentUser.topItems("artists", "medium_term", 20, 0)
    const topArtistResult = await Promise.all(
      resTopArtists.items.map(async (artist) => ({
        id: artist.id,
        name: artist.name,
        thumbnail: artist.images[0].url,
      })),
    )
    setTopArtists(topArtistResult)
  }

  return (
    <>
      {/*<h1 className="font-bold text-3xl pb-4">My Vike app</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>Interactive.</li>
        <li>
          {!player ? <button onClick={() => login()}>Login</button> : <button onClick={api.logOut}>Log Out</button>}
        </li>
        <li>
          <button onClick={() => player?.togglePlay()}>{playbackState?.paused ? "Paused" : "Playing"}</button>
          &nbsp;{playbackState?.track_window.current_track?.name} by{" "}
          {playbackState?.track_window.current_track?.artists.map((a) => <span key={a.uri}>{a.name},&nbsp;</span>)}
        </li>
        <li className="flex flex-col">
          <span>UP Next</span>
          <ol>
            {playbackState?.track_window.next_tracks.map((track) => (
              <li key={track.id}>
                {track.name} by{" "}
                {track.artists.map((a) => (
                  <span key={a.uri}>{a.name},&nbsp;</span>
                ))}
              </li>
            ))}
            {user?.display_name}
          </ol>
        </li>
      </ul>*/}
      <MainElement title="Your Favorites" />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></span>
        </div>
      ) : (
        <ItemGrid items={topSongs} />
      )}

      <MainElement title="Your Top Artists" />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></span>
        </div>
      ) : (
        <ArtistGrid artists={topArtists} />
      )}
      <MainElement title="New Releases" />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></span>
        </div>
      ) : (
        <ItemGrid items={newReleases} />
      )}
    </>
  )
}
