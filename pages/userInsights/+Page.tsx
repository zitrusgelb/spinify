import { useState, useContext, useEffect } from "react"
import ApiContext from "components/ApiContext"
import cn from "classnames"

type TimeRange = "Last 30 Days" | "Last 6 Months" | "Last Year"
type TopItem = "artists" | "tracks"
type TimeRangeApi = "short_term" | "medium_term" | "long_term"
type Track = {
  id: string
  name: string
  image: string
  album: string
  artists: string[]
}
type Artist = {
  id: string
  name: string
  image: string
}

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
  }, [login])

  useEffect(() => {
    if (user) getTopTracks()
  }, [user, selectedRanges["Top Tracks"]])

  useEffect(() => {
    if(user) getTopArtists()
  }, [user, selectedRanges["Top Artists"]]);

  useEffect(() => {
    if(user) getFollowedArtists()
  }, [user, selectedRanges["Followed Artists"]]);

  const getTopTracks = async () => {
    const apiRange = rangeMap[selectedRanges["Top Tracks"]]
    const response = await fetchTopItems({ type: "tracks", timeRange: apiRange })
    const mappedTracks: Track[] = response.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      artists: item.artists.map((a: any) => ({
        id: a.id,
        name: a.name,
      })),
      album: item.album.name,
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
    return await api.currentUser.followedArtists( 0,50)
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
  const items =  title === "Top Tracks" ? topTracks : title === "Top Artists" ? topArtists : followedArtists

  return (
    <div className="flex flex-col">
      <div className=" flex flex-row p-5 gap-5">
        <div className=" font-bold text-3xl text-secondary bg-primary rounded-3xl w-fit h-fit p-5">{title}</div>
        <div>{buttons && <Buttons selected={selectedRange} onSelect={onRangeChange} />}</div>
      </div>
      {items.length > 0 && (
        <div className="flex flex-row gap-4 overflow-x-auto whitespace-nowrap p-5">
          {items.map((item) => {
            return (
            <div key={item.id} className="inline-flex flex-col items-center">
              <img key={item.id} src={item.image} alt={item.name} className="w-45 h-45" />
              <p className="mt-2 text-center text-sm truncate w-45"> {item.name}</p>
            </div>
            )
          })}
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
