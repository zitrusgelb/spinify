import { Track } from '@spotify/web-api-ts-sdk'
import React from 'react'
import MainElement from 'components/MainElement'
import Spinner from 'components/LoadingSpinner'
import TrackList from 'components/TrackList'

export default function TracklistView({
  tracks,
  headerContent = null,
  imgUrl,
  imgAlt,
  loading,
}: {
  tracks: Track[]
  headerContent?: React.ReactNode
  imgUrl?: string
  imgAlt: string
  loading: boolean
}) {
  return (
    <div className="flex flex-col p-5 w-full h-full">
      <div className="flex flex-row items-center">
        <img
          src={imgUrl}
          alt={imgAlt}
          className="max-w-48 max-h-48 min-h-16 min-w-16 m-5 rounded-3xl object-cover"
        />
        <div>
          <MainElement title={loading ? 'Loading...' : imgAlt} />
          {headerContent}
        </div>
      </div>
      {loading ? <Spinner /> : <TrackList tracks={tracks} />}
    </div>
  )
}
