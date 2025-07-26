import { useState, useContext, useEffect } from "react"
import ApiContext from "components/ApiContext"
import { Track, Artist } from "../playlist/@id/types"
import cn from "classnames"

type TimeRange = "Last 30 Days" | "Last 6 Months" | "Last Year"
type TopItem = "artists" | "tracks"
type TimeRangeApi = "short_term" | "medium_term" | "long_term"

interface MainElementProps {
  title: string
  selectedRange: TimeRange
  onRangeChange: (range: TimeRange) => void
  buttons?: boolean
  topTracks: Track[]
  topArtists: Artist[]
  followedArtists: Artist[]
}
interface FetchTopItemsProps {
  type: TopItem
  timeRange: TimeRangeApi
}
interface ButtonsProps {
  selected: TimeRange
  onSelect: (range: TimeRange) => void
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

  useEffect(() => {
    login().then(() => console.log("Login successful"))
  }, [])

  useEffect(() => {
    if (user) {
      getTopTracks()
    }
  }, [[user, selectedRanges]])

  const getTopTracks = async () => {
    const apiRange = rangeMap[selectedRanges["Top Tracks"]]
    const response = await fetchTopItems({ type: "tracks", timeRange: apiRange })
    const mappedTracks: Track[] = response.items.map((item: any) => ({
      id: item.id,
      title: item.name,
      artists: item.artists.map((a: any) => ({
        id: a.id,
        name: a.name,
      })),
      album: item.album.name,
      thumbnail: item.album.images[0].url,
      durationMs: item.duration_ms,
    }))
    setTopTracks(mappedTracks)
  }

  async function fetchTopItems({ type, timeRange }: FetchTopItemsProps) {
    return await api.currentUser.topItems(type, timeRange, 50, 0)
  }

  const handleRangeChange = (title: string, range: TimeRange) => {
    setSelectedRanges((prev: any) => ({
      ...prev,
      [title]: range,
    }))
  }

  return (
    <div className="flex flex-col gap-5 p-5 w-full">
      {Object.keys(selectedRanges).map((section) => (
        <MainElement
          key={section}
          title={section}
          selectedRange={selectedRanges[section]}
          onRangeChange={(range) => handleRangeChange(section, range)}
          buttons={section !== "Followed Artists"}
          topTracks={topTracks}
          topArtists={topArtists}
          followedArtists={followedArtists}
        />
      ))}
    </div>
  )
}

function MainElement({
  title,
  selectedRange,
  onRangeChange,
  buttons = true,
  topTracks,
  topArtists,
  followedArtists,
}: MainElementProps) {
  const items = topTracks
    title === "Top Tracks"
      ? topTracks
      : title === "Top Artists"
        ? topArtists
        : followedArtists

  return (
    <div className="flex flex-col">
      <div className=" flex flex-row p-5 gap-5">
        <div className=" font-bold text-3xl text-secondary bg-primary rounded-3xl w-fit h-fit p-5">{title}</div>
        <div>{buttons && <Buttons selected={selectedRange} onSelect={onRangeChange} />}</div>
      </div>
      {items.length > 0 && (
        <div className="flex flex-row gap-4 overflow-x-auto whitespace-nowrap p-5">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <img key={item.id} src={item.thumbnail} alt={item.title} className="w-45 h-45" />
              <p className="mt-2 text-center text-sm truncate w-45"> {item.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  function Buttons({ selected, onSelect }: ButtonsProps) {
    const buttons: TimeRange[] = ["Last 30 Days", "Last 6 Months", "Last Year"]

    return (
      <div className="flex flex-row gap-5 w-fit h-fit p-4">
        {buttons.map((label) => (
          <button
            key={label}
            onClick={() => onSelect(label)}
            className={cn(
              "rounded-3xl w-fit h-fit text-background p-3 transition duration-200 transform border-2",
              {
                "bg-secondary border-accent": label === selected,
                "bg-accent border-transparent": label !== selected,
              },
              "hover:scale-105 hover:shadow-lg",
              "active:scale-95 active:shadow-md active:bg-accent/80",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    )
  }
}
