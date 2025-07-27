import { TimeRange } from "./+Page"

interface ButtonsProps {
  selected: TimeRange
  onSelect: (range: TimeRange) => void
}

export function Buttons({ selected, onSelect }: ButtonsProps) {
  const buttons: TimeRange[] = ["Last 30 Days", "Last 6 Months", "Last Year"]

  return (
    <div className="flex flex-row gap-5 w-fit h-fit p-4">
      {buttons.map((label) => (
        <button
          key={label}
          onClick={() => onSelect(label)}
          className="rounded-3xl w-fit h-fit text-background p-3 transition duration-200 transform border-2
            ${label === selected ? bg-secondary border-accent : bg-accent border-transparent}
            hover:scale-105 hover:shadow-lg
            active:scale-95 active:shadow-md active:bg-accent/80"
        >
          {label}
        </button>
      ))}
    </div>
  )
}
