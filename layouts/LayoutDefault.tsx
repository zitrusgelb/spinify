import "./tailwind.css"

import logoUrl from "assets/logo.png"
import { ChartLine, Disc3, ListMusic, Settings } from "lucide-react"

import { Link } from "components/Link.js"
import React from "react"
import { ApiContextProvider } from "components/ApiContext"

const links = [
  {
    title: "Home",
    href: "/",
    Icon: Disc3,
  },
  {
    title: "User Insights",
    href: "/userInsights",
    Icon: ChartLine,
  },
  {
    title: "Playlists",
    href: "/playlists",
    Icon: ListMusic,
  },
  {
    title: "Options",
    href: "/options",
    Icon: Settings,
  },
]

export function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-screen bg-background text-black overflow-hidden overflow-ellipsis whitespace-nowrap">
      <div className="flex flex-col items-center gap-5 mt-2 mx-2 w-20">
        <Logo />
        <Sidebar>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <link.Icon className="w-7 h-7 text-primary stroke-[2.25]" />
            </Link>
          ))}
        </Sidebar>
      </div>
      <Content>{children}</Content>
    </div>
  )
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div id="sidebar" className="flex flex-col items-center gap-4 px-3 py-4 bg-primary rounded-3xl">
      {children}
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container" className="flex-1 mt-3 mr-3 mb-3 overflow-auto fade-top fade-bottom">
      <ApiContextProvider>
        <div
          id="page-content"
          className="p-5 pb-12 min-h-full bg-gradient rounded-3xl max-w-screen h-full overflow-y-scroll overflow-hidden scrollbar-transparent"
        >
          {children}
        </div>
      </ApiContextProvider>
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
