// https://vike.dev/Head

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import logoUrl from "../assets/logo.png"

export default function HeadDefault() {
  return (
    <>
      <link rel="icon" href={logoUrl} />
    </>
  )
}
