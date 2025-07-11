import { usePageContext } from "vike-react/usePageContext"
import { PartialSearchResult, SpotifyApi } from "@spotify/web-api-ts-sdk"
import { useCallback, useEffect, useState } from "react"

export default function Search() {
  const pageContext = usePageContext()
  const query = pageContext.routeParams.query

  const api = SpotifyApi.withUserAuthorization("d850768196144dfbab2ee42325a6e287", "http://127.0.0.1:3000", [
    "streaming",
  ])

  const [result, setResult] = useState<Required<
    Pick<PartialSearchResult, "artists" | "albums" | "playlists" | "tracks">
  > | null>(null)

  const getResult = useCallback(async () => {
    const data = await api.search(query, ["album", "artist", "playlist", "track"])

    setResult(data)
  }, [query])

  console.log(result)

  useEffect(() => {
    getResult()
  }, [getResult])

  return (
    <div className="flex flex-col gap-2">
      <span>Ergebnisse für: {query}</span>
      <div className="flex flex-row gap-3">
        {result?.tracks.items.map((track) => (
          <div key={track.id} className="relative h-32 w-32 group">
            <img src={track.album.images[0].url} className="h-full w-full" />
            <div className="absolute bottom-0 break-words bg-gradient-to-b backdrop-blur-md h-full hidden group-hover:flex items-center flex-col w-full p-2">
              {track.artists.map((a) => (
                <a key={a.id} href={`/artists/${a.id}`}>
                  {a.name}
                </a>
              ))}
              <a href={`/track/${track.id}`}>{track.name}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
