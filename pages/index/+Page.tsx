//@ts-nocheck
import { useState } from "react"
import { SpotifyApi } from "@spotify/web-api-ts-sdk"
import useSpotifyPlayer from "components/player"

export default function Page() {
  const [token, setToken] = useState<string | null>(null)

  const sdk = SpotifyApi.withUserAuthorization("d850768196144dfbab2ee42325a6e287", "http://127.0.0.1:3000", [
    "streaming",
  ])

  const { player, playbackState } = useSpotifyPlayer(token)

  const login = async () => {
    const authResponse = await sdk.authenticate()
    if (!authResponse) return

    setToken(authResponse.accessToken.access_token)
  }

  return (
    <>
      <h1 className={"font-bold text-3xl pb-4"}>My Vike app</h1>
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
      </ul>
    </>
  )
}
