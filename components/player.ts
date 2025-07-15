import { useEffect, useState } from "react"

export default function useSpotifyPlayer(token: string | null) {
  const [player, setPlayer] = useState<Spotify.Player | null>(null)
  const [playbackState, setPlaybackState] = useState<Spotify.PlaybackState | null>(null)

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

  return {
    player,
    playbackState,
  }
}
