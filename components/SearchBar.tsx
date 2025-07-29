import { SearchIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { usePageContext } from "vike-react/usePageContext"
import { navigate } from "vike/client/router"

export default function SearchBar() {
  const pageContext = usePageContext()
  const [searchQuery, setSearchQuery] = useState(pageContext.routeParams.query ?? "")

  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    const query = searchRef.current?.value ?? null

    if (!query || query.trim().length < 3) {
      return
    }

    timeout = setTimeout(() => {
      navigate(`/search/${query}`)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [searchQuery])

  return (
    <div className="mb-2">
      <label className="border-secondary border-1 rounded-full flex flex-row bg-primary px-2 gap-2 items-center w-full sm:w-2/3 md:w-1/2 xl:w-1/3 ">
        <SearchIcon className="text-secondary" />
        <input
          ref={searchRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2 focus:outline-0 text-white"
        />
      </label>
    </div>
  )
}
