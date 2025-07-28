import { useContext, useEffect, useState } from "react"
import ApiContext from "components/ApiContext"
import { Artist } from "@spotify/web-api-ts-sdk"
import ImageRowElement from "./ImageRowElement"
import { Buttons } from "./Buttons"
import Track = Spotify.Track

type TimeRange = "Last 30 Days" | "Last 6 Months" | "Last Year"
type TopItem = "artists" | "tracks"
type TimeRangeApi = "short_term" | "medium_term" | "long_term"

interface SectionElementProps {
  title: string
  selectedRange: TimeRange
  onRangeChange: (range: TimeRange) => void
  buttons: boolean
}

interface FetchTopItemsProps {
  type: TopItem
  timeRange: TimeRangeApi
}

export default function Page() {
  const [selectedRanges, setSelectedRanges] = useState<Record<string, TimeRange>>({
    "Top Tracks": "Last 30 Days",
    "Top Artists": "Last 30 Days",
    "Followed Artists": "Last 30 Days",
  })
  const rangeMap: Record<TimeRange, TimeRangeApi> = {
    "Last 30 Days": "short_term",
    "Last 6 Months": "medium_term",
    "Last Year": "long_term",
  }
  const { api, login, user } = useContext(ApiContext)
  const [topTracks, setTopTracks] = useState<Track[]>([])
  const [topArtists, setTopArtists] = useState<Artist[]>([])
  const [followedArtists, setFollowedArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState({ tracks: true, artists: true, followed: true })

  useEffect(() => {
    login().then(() => console.log("Login successful"))
  }, [login])

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

  const getTopTracks = async () => {
    const apiRange = rangeMap[selectedRanges["Top Tracks"]]
    const response = await fetchTopItems({ type: "tracks", timeRange: apiRange })

    const mappedTracks: Track[] = response.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      album: item.album,
      image: item.album.images[0].url,
    }))
    setTopTracks(mappedTracks)
  }

  const getTopArtists = async () => {
    const apiRange = rangeMap[selectedRanges["Top Artists"]]
    const response = await fetchTopItems({ type: "artists", timeRange: apiRange })

    const mappedArtists: Artist[] = response.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      image: item.images[0].url,
    }))
    setTopArtists(mappedArtists)
  }

  async function fetchTopItems({ type, timeRange }: FetchTopItemsProps) {
    return await api.currentUser.topItems(type, timeRange, 50, 0)
  }

  const getFollowedArtists = async () => {
    const response = await fetchFollowedArtists()

    const mappedFollowedArtists: Artist[] = response.artists.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      image: item.images[0].url,
    }))
    setFollowedArtists(mappedFollowedArtists)
  }

  async function fetchFollowedArtists() {
    return await api.currentUser.followedArtists(0, 50)
  }

  const handleRangeChange = (title: string, range: TimeRange) => {
    setSelectedRanges((prev: Record<string, TimeRange>) => ({
      ...prev,
      [title]: range,
    }))
  }

  return (
    <div className="flex flex-col gap-5 p-5 w-full">
      {Object.keys(selectedRanges).map((section) => (
        <div key={section} className="flex flex-col">
          <SectionElement
            key={section}
            title={section}
            selectedRange={selectedRanges[section]}
            onRangeChange={(range) => handleRangeChange(section, range)}
            buttons={section !== "Followed Artists"}
          />
          <ImageRowElement
            items={section === "Top Tracks" ? topTracks : section === "Top Artists" ? topArtists : followedArtists}
            loading={
              section === "Top Tracks" ? loading.tracks : section === "Top Artists" ? loading.artists : loading.followed
            }
          />
        </div>
      ))}
    </div>
  )
}

function SectionElement({ title, selectedRange, onRangeChange, buttons }: SectionElementProps) {
  return (
    <div className=" flex flex-row p-5 gap-5">
      <div className=" font-bold text-3xl text-secondary bg-primary rounded-3xl w-fit h-fit p-5">{title}</div>
      <div>{buttons && <Buttons selected={selectedRange} onSelect={onRangeChange} />}</div>
    </div>
  )
}
