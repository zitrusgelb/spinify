import React from 'react'

export function Grid({ children }: { children: React.ReactNode }) {
  return <div className="flex max-w-full overflow-x-scroll overflow-hidden scrollbar-styled">{children}</div>
}
