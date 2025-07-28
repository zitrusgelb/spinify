import { useCallback, useContext, useEffect, useState } from "react"
import ApiContext from "components/ApiContext"
import MainElementWithButtons from "components/MainElementWithButtons"
import Spinner from "components/LoadingSpinner"
import TrackGrid from "components/TrackGrid"
import { Artist, Track } from "@spotify/web-api-ts-sdk"
import ArtistGrid from "components/ArtistGrid"
import MainElement from "components/MainElement"

export type TimeRange = "Last 30 Days" | "Last 6 Months" | "Last Year"
type TimeRangeApi = "short_term" | "medium_term" | "long_term"

const rangeMap: Record<TimeRange, TimeRangeApi> = {
  "Last 30 Days": "short_term",
  "Last 6 Months": "medium_term",
  "Last Year": "long_term",
}

export default function Page() {
  const [selectedRanges, setSelectedRanges] = useState<Record<string, TimeRange>>({
    "Top Tracks": "Last 30 Days",
    "Top Artists": "Last 30 Days",
    "Followed Artists": "Last 30 Days",
  })
  const { api, user } = useContext(ApiContext)
  const [topTracks, setTopTracks] = useState<Track[]>([])
  const [topArtists, setTopArtists] = useState<Artist[]>([])
  const [followedArtists, setFollowedArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState({ tracks: true, artists: true, followed: true })

  useEffect(() => {
    if (!user) return
    setLoading((l) => ({ ...l, tracks: true }))
    getTopTracks().finally(() => setLoading((l) => ({ ...l, tracks: false })))
  }, [user, selectedRanges["Top Tracks"]])

  useEffect(() => {
    if (!user) return
    setLoading((l) => ({ ...l, artists: true }))
    getTopArtists().finally(() => setLoading((l) => ({ ...l, artists: false })))
  }, [user, selectedRanges["Top Artists"]])

  useEffect(() => {
    if (!user) return
    setLoading((l) => ({ ...l, followed: true }))
    getFollowedArtists().finally(() => setLoading((l) => ({ ...l, followed: false })))
  }, [user, selectedRanges["Followed Artists"]])

  const getTopTracks = useCallback(async () => {
    const apiRange = rangeMap[selectedRanges["Top Tracks"]]
    const response = await api.currentUser.topItems("tracks", apiRange, 50, 0)
    setTopTracks(response.items)
  }, [api, selectedRanges])

  const getTopArtists = useCallback(async () => {
    const apiRange = rangeMap[selectedRanges["Top Artists"]]
    const response = await api.currentUser.topItems("artists", apiRange, 50, 0)
    setTopArtists(response.items)
  }, [api, selectedRanges])

  const getFollowedArtists = useCallback(async () => {
    const response = await api.currentUser.followedArtists("0", 50)
    setFollowedArtists(response.artists.items)
  }, [api])

  const handleRangeChange = (title: string, range: TimeRange) => {
    setSelectedRanges((prev: Record<string, TimeRange>) => ({
      ...prev,
      [title]: range,
    }))
  }

  return (
    <div className="flex flex-col gap-5 p-5 w-full">
      <MainElementWithButtons
        title="Top Tracks"
        selectedRange={selectedRanges["Top Tracks"]}
        onRangeChange={(range) => handleRangeChange("Top Tracks", range)}
      />
      {loading.tracks ? <Spinner /> : <TrackGrid tracks={topTracks} />}
      <MainElementWithButtons
        title="Top Artists"
        selectedRange={selectedRanges["Top Artists"]}
        onRangeChange={(range) => handleRangeChange("Top Artists", range)}
      />
      {loading.artists ? <Spinner /> : <ArtistGrid artists={topArtists} />}
      <MainElement title="Followed Artists" />
      {loading.followed ? <Spinner /> : <ArtistGrid artists={followedArtists} />}
    </div>
  )
}
