export type Track = {
  id: string
  title: string
  artists: Artist[]
  album: string
  thumbnail: string
  durationMs: number
}
export type Artist = { id: string; name: string }
