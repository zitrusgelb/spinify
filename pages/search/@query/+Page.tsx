import { usePageContext } from "vike-react/usePageContext"
import { PartialSearchResult, SimplifiedPlaylist } from "@spotify/web-api-ts-sdk"
import { useCallback, useContext, useEffect, useState } from "react"
import TrackGrid from "components/TrackGrid"
import ArtistGrid from "components/ArtistGrid"
import MainElement from "components/MainElement"
import AlbumGrid from "components/AlbumGrid"
import PlaylistGrid from "components/PlaylistGrid"
import ApiContext from "components/ApiContext"
import Spinner from "components/LoadingSpinner"

export default function Search() {
  const pageContext = usePageContext()
  const query = pageContext.routeParams.query

  const { api } = useContext(ApiContext)

  const [result, setResult] = useState<Required<
    Pick<PartialSearchResult, "artists" | "albums" | "playlists" | "tracks">
  > | null>(null)

  const getResult = useCallback(async () => {
    const data = await api.search(query, ["album", "artist", "playlist", "track"])

    setResult(data)
  }, [api, query])


  useEffect(() => {
    getResult()
  }, [getResult])

  return (
    <div className="flex flex-row gap-3">
      {result && (
        <div className="flex flex-col gap-2 w-full">
          <MainElement title="Tracks" />
          <TrackGrid tracks={result?.tracks.items} />
          <MainElement title="Artists" />
          <ArtistGrid artists={result?.artists.items} />

          <MainElement title="Albums" />
          <AlbumGrid albums={result?.albums.items} />

          <MainElement title="Playlists" />
          <PlaylistGrid playlists={result?.playlists.items.filter((i) => i?.id) as SimplifiedPlaylist[]} />
        </div>
      )}
      {!result && (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Spinner />
        </div>
      )}
    </div>
  )
}
