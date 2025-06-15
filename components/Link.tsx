import { usePageContext } from "vike-react/usePageContext"
import type { ReactNode } from "react"

export function Link({ href, children }: { href: string; children: ReactNode }) {
  const pageContext = usePageContext()
  const { urlPathname } = pageContext
  const isActive = href === "/" ? urlPathname === href : urlPathname.startsWith(href)

  return (
    <a
      href={href}
      className={[
        "w-12 h-12 rounded-full bg-secondary flex items-center justify-center transition-colors",
        isActive ? "ring-3 ring-accent ring-offset-background" : "opacity-80 hover:opacity-100",
      ].join(" ")}
    >
      {children}
    </a>
  )
}
