import { useContext, useEffect, useState } from 'react'
import ApiContext from 'components/ApiContext'
import { usePageContext } from 'vike-react/usePageContext'
import { Playlist, Track } from '@spotify/web-api-ts-sdk'
import TracklistView from 'components/TracklistView'

export default function Page() {
  const { api } = useContext(ApiContext)
  const [loading, setLoading] = useState(true)
  const [playlist, setPlaylist] = useState<Playlist<Track>>()
  const id = usePageContext().routeParams.id

  useEffect(() => {
    fetchTracks().finally(() => setLoading(false))
  }, [])

  const fetchTracks = async () => {
    setLoading(true)
    const playlist = await api.playlists.getPlaylist(id)
    setPlaylist(playlist)
  }

  return (
    <TracklistView
      tracks={playlist?.tracks.items.map(track => track.track) ?? []}
      headerContent={
        <div className="h-full text-m font-bold text-center pb-5 text-primary">
          Created by: {playlist?.owner.display_name}
        </div>
      }
      elementUri={playlist?.uri}
      imgUrl={playlist?.images[0]?.url ?? undefined}
      imgAlt={playlist?.name ?? ""}
      loading={loading}
    />
  )
}
