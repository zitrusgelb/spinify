import { LoaderCircleIcon } from "lucide-react"

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <LoaderCircleIcon className="animate-spin rounded-full h-12 w-12"></LoaderCircleIcon>
    </div>
  )
}
