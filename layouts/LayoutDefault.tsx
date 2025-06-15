import "./tailwind.css"
import logoUrl from "../assets/logo.png"
import { HomeIcon, OptionsIcon, PlaylistsIcon, UserInsightsIcon } from "./icons"

import { Link } from "../components/Link.js"
import React from "react"

export function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex w-full bg-background text-secondary min-h-screen"}>
      <SidebarWithLogo>
        <Logo />
        <Sidebar>
          <Link href="/">
            <HomeIcon />
          </Link>
          <Link href="/userInsights">
            <UserInsightsIcon />
          </Link>
          <Link href="/options">
            <OptionsIcon />
          </Link>
          <Link href="/playlists">
            <PlaylistsIcon />
          </Link>
        </Sidebar>
      </SidebarWithLogo>
      <Content>{children}</Content>
    </div>
  )
}

function SidebarWithLogo({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center gap-[28px] mt-[13px] mx-[13px] w-fit">{children}</div>
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="sidebar"
      className="flex flex-col items-center gap-[21px] px-[11px] py-[21px] bg-primary rounded-[20px] w-fit h-fit"
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
    <div>
      <a href="/">
        <img src={logoUrl} height={82} width={90} alt="logo" />
      </a>
    </div>
  )
}
