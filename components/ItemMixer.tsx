export default function shuffle(toBeShuffled: any): any {
  let currentIndex = toBeShuffled.length
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[toBeShuffled[currentIndex], toBeShuffled[randomIndex]] = [toBeShuffled[randomIndex], toBeShuffled[currentIndex]]
  }
  return toBeShuffled
}
