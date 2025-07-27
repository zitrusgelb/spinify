import { LoaderCircleIcon } from "lucide-react"

export default function LoadingIcon() {
  return (
    <div className="flex justify-center items-center h-64">
      <LoaderCircleIcon className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>
  )
}
