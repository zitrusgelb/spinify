import { Track } from "@spotify/web-api-ts-sdk"
import React, { useContext } from 'react'
import MainElement from "components/MainElement"
import Spinner from "components/LoadingSpinner"
import TrackList from "components/TrackList"
import ApiContext from 'components/ApiContext'
import PlayerContext from 'components/PlayerContext'

export default function TracklistView({
  tracks,
  headerContent = null,
  elementUri = undefined,
  imgUrl,
  imgAlt,
  loading,
}: {
  tracks: Track[]
  headerContent?: React.ReactNode
  elementUri?: string
  imgUrl?: string
  imgAlt: string
  loading: boolean
}) {
  const {api} = useContext(ApiContext)
  const {deviceId} = useContext(PlayerContext)

  return (
    <div className="flex flex-col p-5 w-full h-full">
      <div className="flex flex-row items-center">
        <img
          src={imgUrl}
          alt={imgAlt}
          className="max-w-48 max-h-48 min-h-16 min-w-16 m-5 rounded-3xl object-cover cursor-pointer hover:scale-105 transition duration-200"
          onClick={() => api.player.startResumePlayback(deviceId ?? '', elementUri)}
        />
        <div>
          <MainElement title={loading ? "Loading..." : imgAlt} />
          {headerContent}
        </div>
      </div>
      {loading ? <Spinner /> : <TrackList tracks={tracks} />}
    </div>
  )
}
