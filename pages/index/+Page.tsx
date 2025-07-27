import { useContext, useEffect, useState } from "react"
import ApiContext from "components/ApiContext"
import MainElement from "components/MainElement"
import ArtistGrid from "components/ArtistGrid"
import shuffle from "components/ItemMixer"
import Spinner from "components/LoadingSpinner"
import AlbumGrid from "components/AlbumGrid"
import { Album, Artist, SimplifiedAlbum, Track } from "@spotify/web-api-ts-sdk"
import TrackGrid from "components/TrackGrid"

export default function Page() {
  const { api, login, token, user } = useContext(ApiContext)

  // const { player, playbackState } = useSpotifyPlayer(token)
  const [topSongs, setTopSongs] = useState<Track[]>([])
  const [newReleases, setNewReleases] = useState<SimplifiedAlbum[]>([])
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
    const resItems = await api.player.getRecentlyPlayedTracks()
    setTopSongs(resItems.items.map((track) => track.track))
  }

  const fetchNewReleases = async () => {
    const resNewReleases = await api.browse.getNewReleases("DE", 20, Math.floor(Math.random() * 20))
    setNewReleases(resNewReleases.albums.items)
  }

  const fetchTopArtists = async () => {
    const resTopArtists = await api.currentUser.topItems("artists", "medium_term", 20, 0)
    setTopArtists(shuffle(resTopArtists.items))
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
      <MainElement title="Recently Played" />
      {loading ? <Spinner /> : <TrackGrid tracks={topSongs} />}
      <MainElement title="Your Artists" />
      {loading ? <Spinner /> : <ArtistGrid artists={topArtists} />}
      <MainElement title="New Releases" />
      {loading ? <Spinner /> : <AlbumGrid albums={newReleases} />}
    </>
  )
}
