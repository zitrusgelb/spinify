export type Track = {
  id: string
  title: string
  artists: Artist[]
  album: string
  thumbnail: string
  durationMs: number
}
export type Artist = { id: string; name: string; image: string}

export type Playlist = { title: string; thumbnail: string | null; id: string }
