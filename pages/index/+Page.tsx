// @ts-nocheck
import { useEffect, useState } from "react"
import { SpotifyApi } from "@spotify/web-api-ts-sdk"
import FullScreenPlayer from "../../components/FullScreenPlayer" // adjust if needed

export default function Page() {
  const [player, setPlayer] = useState<Spotify.Player | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [playbackState, setPlaybackState] = useState<Spotify.Player | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false) // modal toggle

  const sdk = SpotifyApi.withUserAuthorization("d850768196144dfbab2ee42325a6e287", "http://127.0.0.1:3000", [
    "streaming",
  ])

  useEffect(() => {
    if (!token) return

    const script = document.createElement("script")
    script.src = "https://sdk.scdn.co/spotify-player.js"
    script.async = true
    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Spinify",
        getOAuthToken: (cb) => cb(token),
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

  const login = async () => {
    const authResponse = await sdk.authenticate()
    if (!authResponse) return
    setToken(authResponse.accessToken.access_token)
  }

  return (
    <>
      <h1 className="font-bold text-3xl pb-4">My Vike app</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>Interactive.</li>
        <li>{!player ? <button onClick={login}>Login</button> : <button onClick={sdk.logOut}>Log Out</button>}</li>
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
          </ol>
        </li>
        <li>
          {/* Open Fullscreen Modal Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-[var(--color-primary)] text-white px-4 py-2 rounded"
          >
            Open Fullscreen Player
          </button>
        </li>
      </ul>
      {/* Fullscreen Modal */}
      <FullScreenPlayer isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
