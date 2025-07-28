import LoadingIcon from "./LoadingIcon"
import { Artist } from "@spotify/web-api-ts-sdk"
import Track = Spotify.Track

interface ImageRowElementProps {
  items: Artist[] | Track[]
  loading: boolean
}

export default function ImageRowElement({ items, loading }: ImageRowElementProps) {
  return (
    <div>
      {loading ? (
        <LoadingIcon />
      ) : (
        items.length > 0 && (
          <div className="flex flex-row gap-4 overflow-x-auto whitespace-nowrap p-5 items-center">
            {items.map((item) => {
              return (
                <div key={item.id} className="inline-flex flex-col items-center">
                  <img
                    key={item.id}
                    src={item.image}
                    alt={item.name}
                    className="max-w-45 max-h-45 rounded-3xl object-cover"
                  />
                  <p className="mt-2 text-center text-sm truncate w-45"> {item.name}</p>
                </div>
              )
            })}
          </div>
        )
      )}
    </div>
  )
}
