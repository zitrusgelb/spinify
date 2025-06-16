import "./tailwind.css"

import logoUrl from "assets/logo.png"
import { ChartLine, Disc3, ListMusic, Settings } from "lucide-react"

import { Link } from "components/Link.js"
import React from "react"

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
    <div className={"flex w-full bg-background text-black min-h-screen"}>
      <div className="flex flex-col items-center gap-7 mt-3 mx-3 w-fit">
        <Logo />
        <Sidebar>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <link.Icon className="w-8 h-8 text-primary " />
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
    <div id="sidebar" className="flex flex-col items-center gap-5 px-3 py-5 bg-primary rounded-3xl">
      {children}
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container" className="flex-1 mt-3 mr-3 mb-3">
      <div id="page-content" className="p-5 pb-12 min-h-full bg-gradient rounded-3xl w-full h-full">
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
