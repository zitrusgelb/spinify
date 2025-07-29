import { useState } from 'react'
import FullScreenPlayer from 'components/FullScreenPlayer'

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false) // modal toggle

  return (
    <>
      <h1 className={'font-bold text-3xl pb-4'}>My Vike app</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>Interactive.</li>
        <li>
          {/* Open Fullscreen Modal Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-[var(--color-primary)] text-white px-4 py-2 rounded"
          >
            Open Fullscreen Player
          </button>
        </li>
      </ul>
      {/* Fullscreen Modal */}
      <FullScreenPlayer isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
