export type Item = { id: string; name: string; thumbnail: string; type: ItemType }

export enum ItemType {
  Track,
  Album,
  Artist,
  Playlist,
}
