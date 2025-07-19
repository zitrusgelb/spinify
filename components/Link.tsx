import { usePageContext } from "vike-react/usePageContext"
import type { ReactNode } from "react"

export function Link({ href, children }: { href: string; children: ReactNode }) {
  const pageContext = usePageContext()
  const { urlPathname } = pageContext
  const isActive = href === "/" ? urlPathname === href : urlPathname.startsWith(href)

  return (
    <a
      href={href}
      className={`
        w-fit h-fit rounded-full bg-secondary flex items-center justify-center transition-colors p-2.5 hover:scale-105 hover:shadow-lg
        ${isActive ? "ring-3 ring-accent ring-offset-background" : "opacity-80 hover:opacity-100"}
      `}
    >
      {children}
    </a>
  )
}
