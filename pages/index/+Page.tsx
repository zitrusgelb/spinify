import { useContext, useEffect, useState } from "react"
import ApiContext from "components/ApiContext"
import PlaybackState = Spotify.PlaybackState


export default function Page() {
  const { api, login, token, user } = useContext(ApiContext)

  const { player, playbackState } = useSpotifyPlayer(token)

  return (
    <>
      <h1 className="font-bold text-3xl pb-4">My Vike app</h1>
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
