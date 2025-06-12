import "./style.css"

import "./tailwind.css"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import logoUrl from "../assets/logo.png"
import { Link } from "../components/Link.js"

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex w-full bg-background text-secondary min-h-screen\n"}>
      <Sidebar>
        <Logo />
        <Link href="/">Home</Link>
        <Link href="/userInsights">User Insights</Link>
        <Link href="/options">Options</Link>
        <Link href="/playlists">Playlists</Link>
      </Sidebar>
      <Content>{children}</Content>
    </div>
  )
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div id="sidebar" className={"p-5 flex flex-col shrink-0 bg-primary rounded-[20px]"}>
      {children}
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div id="page-content" className={"p-5 pb-12 min-h-screen"}>
        {children}
      </div>
    </div>
  )
}

function Logo() {
  return (
    <div className={"p-5 mb-2"}>
      <a href="/">
        <img src={logoUrl} height={64} width={64} alt="logo" />
      </a>
    </div>
  )
}
