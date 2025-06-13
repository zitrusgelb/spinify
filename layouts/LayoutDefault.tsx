import "./style.css"
import "./tailwind.css"
import logoUrl from "../assets/logo.png"
import { ReactComponent as HomeIcon } from "../assets/homeIcon.svg"
import { ReactComponent as UserInsightsIcon } from "../assets/userInsightsIcon.svg"
import { ReactComponent as OptionsIcon } from "../assets/optionsIcon.svg"
import { ReactComponent as PlaylistIcon } from "../assets/playlistIcon.svg"

import { Link } from "../components/Link.js"
import React from "react"

export function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex w-full bg-background text-secondary min-h-screen"}>
      <Logo />
      <Sidebar>
        <Link href="/">
          <HomeIcon className="h-9 w-9 fill-current" />
        </Link>
        <Link href="/userInsights">
          <UserInsightsIcon className="h-9 w-9 fill-current" />
        </Link>
        <Link href="/options">
          <OptionsIcon className="h-9 w-9 fill-current" />
        </Link>
        <Link href="/playlists">
          <PlaylistIcon className="h-9 w-9 fill-current" />
        </Link>
      </Sidebar>
      <Content>{children}</Content>
    </div>
  )
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="sidebar"
      className="flex flex-col items-start gap-[21px] px-[11px] py-[21px] bg-primary rounded-[20px] w-fit h-fit"
    >
      {children}
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div id="page-content" className={"p-5 pb-12 min-h-screen bg-accent"}>
        {children}
      </div>
    </div>
  )
}

function Logo() {
  return (
    <div className="p-5 mb-6">
      <a href="/">
        <img src={logoUrl} height={64} width={64} alt="logo" />
      </a>
    </div>
  )
}
