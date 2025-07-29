export function millisToTime(millis: number) {
  const hours = Math.floor(millis / 3600000)
  const minutes = Math.floor((millis % 3600000) / 60000)
  const seconds = Math.floor((millis % 60000) / 1000)
  const paddedMinutes = hours > 0 ? String(minutes).padStart(2, '0') : String(minutes)
  const paddedSeconds = String(seconds).padStart(2, '0')
  return hours > 0 ? `${hours}:${paddedMinutes}:${paddedSeconds}` : `${minutes}:${paddedSeconds}`
}
