import "./tailwind.css"

import logoUrl from "assets/logo.png"
import {ChartLine, Disc3, ListMusic} from "lucide-react"

import {Link} from "components/Link.js"
import React from "react"
import SearchBar from "components/SearchBar"
import {ApiContextProvider} from 'components/ApiContext'
import {PlayerContextProvider} from 'components/PlayerContext'

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
]

export function LayoutDefault({children}: { children: React.ReactNode }) {
    return (
        <div
            className="flex w-full bg-background text-black h-screen overflow-hidden overflow-ellipsis whitespace-nowrap"
            lang="de"
        >
            <div className="flex flex-col items-center gap-5 mt-2 mx-2 w-20">
                <Logo/>
                <Sidebar>
                    {links.map((link) => (
                        <Link key={link.href} href={link.href}>
                            <link.Icon className="w-7 h-7 text-primary stroke-[2.25]"/>
                        </Link>
                    ))}
                </Sidebar>
            </div>
            <Content>{children}</Content>
        </div>
    )
}

function Sidebar({children}: { children: React.ReactNode }) {
    return (
        <div id="sidebar" className="flex flex-col items-center gap-4 px-3 py-4 bg-primary rounded-3xl">
            {children}
        </div>
    )
}

function Content({children}: { children: React.ReactNode }) {
    return (
        <div id="page-container" className="flex-1 flex flex-col py-3 pr-3 overflow-hidden h-full">
            <ApiContextProvider>
                <PlayerContextProvider>
                    <SearchBar/>
                    <div className="h-full overflow-auto rounded-3xl">
                        <div
                            id="page-content"
                            className="p-5 pb-12 bg-gradient h-full max-w-screen overflow-y-scroll overflow-hidden scrollbar-transparent"
                        >
                            {children}
                        </div>
                    </div>
                </PlayerContextProvider>
            </ApiContextProvider>
        </div>
    )
}

function Logo() {
    return (
        <div className="hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md">
            <a href="/">
                <img src={logoUrl} height={82} width={90} alt="logo"/>
            </a>
        </div>
    )
}
