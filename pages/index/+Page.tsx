import { useCallback, useEffect, useState } from "react"
import useSpotifyApi from "components/spotifyApi"
import { User } from "@spotify/web-api-ts-sdk"
import PlaybackState = Spotify.PlaybackState

export default function Page() {
  const [player, setPlayer] = useState<Spotify.Player | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [playbackState, setPlaybackState] = useState<PlaybackState | null>(null)

  const { api, login } = useSpotifyApi()

  useEffect(() => {
    if (!token) return

    const script = document.createElement("script")
    script.src = "https://sdk.scdn.co/spotify-player.js"
    script.async = true

    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Spinify",
        getOAuthToken: (cb) => {
          cb(token)
        },
        volume: 0.5,
        enableMediaSession: true,
      })

      setPlayer(player)

      player.addListener("ready", ({ device_id }) => {
        console.warn("Ready with Device ID", device_id)
      })

      player.addListener("not_ready", ({ device_id }) => {
        console.warn("Device ID has gone offline", device_id)
      })

      player.addListener("player_state_changed", (playback) => {
        setPlaybackState(playback)
        const {
          position,
          duration,
          track_window: { current_track },
        } = playback
        console.log("Currently Playing", current_track)
        console.log("Position in Song", position)
        console.log("Duration of Song", duration)
      })

      player.connect()
    }
  }, [token])

  const [user, setUser] = useState<User | null>(null)

  const loadUser = useCallback(async () => {
    if (!token) return

    const data = await api.currentUser.profile()
    setUser(data)
  }, [token])

  useEffect(() => {
    if (!token) return

    loadUser()
  }, [token])

  const handleLogin = async () => {
    const responseToken = await login()

    if (!responseToken) return

    setToken(responseToken)
  }

  return (
    <>
      <h1 className={"font-bold text-3xl pb-4"}>My Vike app</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>Interactive.</li>
        <li>
          {!player ? (
            <button onClick={() => handleLogin()}>Login</button>
          ) : (
            <button onClick={api.logOut}>Log Out</button>
          )}
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
      </ul>
    </>
  )
}
