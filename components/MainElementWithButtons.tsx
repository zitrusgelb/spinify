import { Buttons } from "components/Buttons"
import { TimeRange } from "../pages/userInsights/+Page"

interface MainElementWithButtonsProps {
  title: string
  selectedRange: TimeRange
  onRangeChange: (range: TimeRange) => void
}

export default function MainElementWithButtons({ title, selectedRange, onRangeChange }: MainElementWithButtonsProps) {
  return (
    <div className="overflow-x-auto -mx-5 px-5 scrollbar-styled">
      <div className=" flex flex-row p-5 gap-5 whitespace-nowrap flex-nowrap">
        <div className=" font-bold text-3xl text-secondary bg-primary rounded-3xl w-fit h-fit p-5">{title}</div>
        <Buttons selected={selectedRange} onSelect={onRangeChange} />
      </div>
    </div>
  )
}
